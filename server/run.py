import os
from v1.apps import app, db, socketio

if __name__ == '__main__':
    db.create_all()
    port = int(os.environ.get('PORT', 5000))
    socketio.run(app, debug=True, port=port, host='0.0.0.0')
