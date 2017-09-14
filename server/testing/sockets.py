from . import TestingBase
from v1.apps.users.models import User

import json

class SocketTests(TestingBase):

    def test_login(self):
        name = "TestUser1"
        password = "password"
        self.socketio.emit('login', {
            "name": name,
            "password": password,
        })
        response = self.socketio.get_received()
        latest_response = response[-1]['args'][0]
        assert name in latest_response['user']['name']
