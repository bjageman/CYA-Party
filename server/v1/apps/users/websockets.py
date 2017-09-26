from flask_socketio import emit
from .utils import authenticate
from v1.apps.errors import emit_error
from v1.apps import socketio
from .parsers import parse_user

@socketio.on('login')
def login(data):
    try:
        name = data['name']
        password = data['password']
    except (AttributeError, KeyError):
        emit_error("Bad Request")
    user = authenticate(name, password)
    if user is not None:
        emit('user_login_success',{
            "user": parse_user(user),
        })
    else:
        emit_error("Incorrect name/Password")
