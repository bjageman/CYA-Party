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
def get_open_sessions():
    sessions = Session.query.filter_by(closed=False).filter_by(active=False)
    for i in sessions:
        print(i.id, i.active)
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

def create_session(story, host):
    name = story.slug + "-session"
    host_player = Player(user=host)
    existing_sessions = Session.query.filter_by(host=host).filter_by(closed=False)
    for existing_session in existing_sessions:
        existing_session.closed = True
        existing_session.active = False
        db.session.add(existing_session)
        db.session.commit()
        print("deactivate",existing_session.id)
        emit('session_deactivated', { }, room=existing_session.id)
    session = Session(name=name, host=host, story=story, closed=False, active=False)
    session.players.append(host_player)
    return session

def add_new_player(session, user):
    user_exists = False
    user_count = (player for player in session.players if player.user == user)
    for i in user_count:
        user_exists = True
    if not user_exists:
        player = Player(user=user)
        session.players.append(player)
    return session

def get_user_by_auth(auth_token):
    user_id = decode_auth_token(auth_token)
    user = User.query.get(user_id)
    return user

@socketio.on('create_session')
def create_session_request(data):
    story_id = get_required_data(data, "story_id")
    auth_token = get_required_data(data, "access_token")
    story = get_story(story_id)
    host = get_user_by_auth(auth_token)
    session = create_session(story, host)
    db.session.add(session)
    db.session.commit()
    join_room(session.id)
    emit('create_session_success', {
        "session": parse_session(session)
    }, room=session.id)


@socketio.on('join_session')
def join_session(data):
    session_id = get_required_data(data, "session_id")
    auth_token = get_required_data(data, "access_token")
    session = Session.query.get(session_id)
    user = get_user_by_auth(auth_token)
    session = add_new_player(session, user)
    db.session.add(session)
    db.session.commit()
    join_room(session.id)
    emit('join_session_success', {
        "session": parse_session(session)
    }, room=session.id)

@socketio.on('start_session')
def start_session(data):
    session_id = get_required_data(data, "session_id")
    session = Session.query.get(session_id)
    session.active = True
    db.session.add(session)
    db.session.commit()
    session = Session.query.get(session_id)
    first_page = Page.query.filter(Page.story == session.story).first() #.filter(Page.start == True)
    emit('start_session_success', {
        "page": parse_page(first_page, detailed=True)
    }, room=session.id)

@socketio.on('vote_choice')
def vote(data):
    session_id = get_required_data(data, "session_id")
    auth_token = get_required_data(data, "access_token")
    choice_id = get_required_data(data, "choice_id")
    user = get_user_by_auth(auth_token)
    session = Session.query.get(session_id)
    player = Player.query.filter_by(user=user).first()
    choice = Choice.query.get(choice_id)
    vote = Vote.query.filter(Vote.session == session).filter(Vote.page == choice.page).filter(Vote.player == player).first()
    if vote is not None:
        vote.choice = choice
    else:
        vote = Vote(session=session, choice=choice, player=player, page=choice.page)
    db.session.add(vote)
    db.session.commit()
    votes = Vote.query.filter(Vote.session == session).filter(Vote.page == choice.page)
    #Check for a vote result
    result = None
    vote_tally = vote_count(votes)
    if (len(vote_tally) == len(session.players)):
        result = max(vote_tally, key=vote_tally.get)
        print("RESULT",result)
    emit('vote_choice_success', {
        "votes": vote_tally,
        "result": result,
    }, room=session.id)
