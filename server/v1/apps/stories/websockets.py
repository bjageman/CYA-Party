from flask import request, jsonify
from flask_socketio import emit, send, join_room, leave_room
from v1.apps.errors import emit_error
from v1.apps import socketio, app
from .models import Story, Page, Choice, Action

@socketio.on('connect', namespace='/stories')
def test_connect():
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect', namespace='/stories')
def test_disconnect():
    print('Client Disconnected...')

@socketio.on('create_session', namespace='/stories')
def stories(data):

    send({
        "received": data['message'],
        "message": "Who's There?",
    })

@app.route('/socket', methods=['GET', 'POST'])
def test_socket():
    print("GET received")
    socketio.emit('request', {"message": "GET BRO"}, namespace="/stories")
    return jsonify({"message": "SUCCESS"})
