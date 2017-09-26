from flask import request, jsonify
from flask_socketio import emit, send, join_room, leave_room
from v1.apps.errors import emit_error
from v1.apps import socketio, app, db
from v1.apps.users.models import User
from ..models import *
from v1.apps.stories.parsers import parse_session, parse_page, vote_count

@socketio.on('connect', namespace='/stories')
def test_connect():
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect', namespace='/stories')
def test_disconnect():
    print('Client Disconnected...')

@socketio.on('create_session', namespace='/stories')
def stories(data):
    story = Story.query.get(data['story_id'])
    user = User.query.get(data['user_id'])
    player = Player(user=user)
    session = Session(story=story, closed=False, active=False)
    session.players.append(player)
    db.session.add(session)
    db.session.commit()
    join_room(session.id)
    send({
        "session": parse_session(session)
    }, room=session.id)

@socketio.on('join_session', namespace='/stories')
def stories(data):
    session = Session.query.get(data['session_id'])
    user = User.query.get(data['user_id'])
    join_room(session.id)
    player = Player(user=user)
    session.players.append(player)
    db.session.add(session)
    db.session.commit()
    send({
        "session": parse_session(session)
    }, room=session.id)

@socketio.on('start_game', namespace='/stories')
def stories(data):
    session = Session.query.get(data['session_id'])
    session.active = True
    db.session.add(session)
    db.session.commit()
    first_page = Page.query.filter(Page.story == session.story).filter(Page.start == True).first()
    send({
        "page": parse_page(first_page, detailed=True)
    }, room=session.id)

@socketio.on('vote', namespace='/stories')
def stories(data):
    session = Session.query.get(data['session_id'])
    choice = Choice.query.get(data['choice_id'])
    player = Player.query.get(data['player_id'])
    vote = Vote.query.filter(Vote.session == session).filter(Vote.page == choice.page).filter(Vote.player == player).first()
    if vote is not None:
        vote.choice = choice
    else:
        vote = Vote(session=session, choice=choice, player=player, page=choice.page)
    db.session.add(vote)
    db.session.commit()
    votes = Vote.query.filter(Vote.session == session).filter(Vote.page == choice.page)
    send({
        "votes": vote_count(votes)
    }, room=session.id)

@app.route('/socket', methods=['GET', 'POST'])
def test_socket():
    socketio.emit('request', {"message": "GET BRO"}, namespace="/stories")
    return jsonify({"message": "SUCCESS"})
