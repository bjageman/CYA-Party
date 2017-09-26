from flask import request, jsonify
from flask_socketio import emit, send, join_room, leave_room
from v1.apps.errors import emit_error
from v1.apps import socketio, app, db
from v1.apps.users.models import User
from .models import Story, Session, Player
from v1.apps.stories.parsers import parse_session

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

@app.route('/socket', methods=['GET', 'POST'])
def test_socket():
    print("GET received")
    socketio.emit('request', {"message": "GET BRO"}, namespace="/stories")
    return jsonify({"message": "SUCCESS"})
