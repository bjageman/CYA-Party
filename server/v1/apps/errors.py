from flask_socketio import emit
from . import app

@app.errorhandler(401)
def unauthorized(error):
    message = handle_custom_message(error, "Unauthorized Access")
    return make_response(jsonify({'error': message}), 401)

#Web Sockets
def emit_error(error, room=None):
    emit('send_error',{
        'error': error
        }, room=room)
