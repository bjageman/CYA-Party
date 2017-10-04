from flask import request, jsonify
from flask_jwt import jwt_required, current_identity
from v1.apps.auth import decode_auth_token
from v1.apps.stories import player
#Sockets
from flask_socketio import emit, send, join_room, leave_room
from v1.apps.errors import emit_error
from v1.apps import socketio, db
#Models
from v1.apps.users.models import User
from ..models import *
#Parsers
from v1.apps.stories.parsers import *
from v1.apps.stories.utils import *

@player.route('/sessions', methods=['GET'])
def get_sessions():
    sessions = Session.query.filter_by(closed=False)
    return jsonify({"listing": parse_sessions(sessions)})


@player.route('/stories', methods=['GET'])
def get_owner_stories():
    stories = Story.query.filter_by(public=True)
    return jsonify({"listing": parse_stories(stories)})

@player.route('/stories/<story_id>', methods=['GET'])
def get_story_request(story_id):
    story = get_story(story_id)
    return jsonify({"story": parse_story(story) })

@socketio.on('connect')
def test_connect():
    print("CONNECTED")
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect')
def test_disconnect():
    print('Client Disconnected...')

@socketio.on('create_session')
def create_session(data):
    story_id = get_required_data(data, "story_id")
    story = get_story(story_id)
    auth_token = get_required_data(data, "access_token")
    user_id = decode_auth_token(auth_token)
    user = User.query.get(user_id)
    player = Player(user=user)
    name = story.slug + "_session"
    session = Session(name=name, story=story, closed=False, active=False)
    session.players.append(player)
    db.session.add(session)
    db.session.commit()
    print("SESSION MADE", session)
    join_room(session.id)
    emit('create_session_success', {
        "session": parse_session(session)
    }, room=session.id)

@socketio.on('join_session', namespace='/stories')
def join_session(data):
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
def start_game(data):
    session = Session.query.get(data['session_id'])
    session.active = True
    db.session.add(session)
    db.session.commit()
    first_page = Page.query.filter(Page.story == session.story).filter(Page.start == True).first()
    send({
        "page": parse_page(first_page, detailed=True)
    }, room=session.id)

@socketio.on('vote', namespace='/stories')
def vote(data):
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
#
# @player.route('/socket', methods=['GET', 'POST'])
# def test_socket():
#     socketio.emit('request', {"message": "GET BRO"}, namespace="/stories")
#     return jsonify({"message": "SUCCESS"})
