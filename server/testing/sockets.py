from . import TestingBase
from v1.apps.users.models import User
from flask_socketio import SocketIOTestClient
from v1.apps import app, socketio

import json

class SocketTests(TestingBase):
    def setUp(self):
        super().setUp()
        self.socketio_client = SocketIOTestClient(app, socketio)

    def tearDown(self):
        super().tearDown()
        self.socketio_client.disconnect()


    def login(self):
        name = "TestUser1"
        password = "password"
        self.socketio.emit('login', {
            "name": name,
            "password": password,
        })
        response = self.socketio.get_received()
        latest_response = response[-1]['args'][0]
        assert name in latest_response['user']['name']

    def test_create_session(self):
        self.importTestData()
        story_id = 1
        user_id = 1
        socket_client = SocketIOTestClient(app, socketio, namespace="/stories")
        socket_client.connect()
        assert 'Connected' in socket_client.get_received('/stories')[0]['args'][0]['data']
        self.app.get('/socket')
        socket_client.emit('create_session', {
            "story_id": story_id,
            "user_id": user_id,
        }, namespace="/stories")
        response = socket_client.get_received('/stories')
        session_data = response[-1]['args']['session']
        story_data = session_data['story']
        players_data = session_data['players']
        # print(session_data, "\n\n", story_data, "\n\n", players_data)
        assert story_data['id'] == story_id
        assert players_data[0]['id'] == user_id
        socket_client.disconnect()
