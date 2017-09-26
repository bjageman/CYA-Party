import os
import unittest
import json
from v1.apps import app, db
from v1.apps.users.models import User
from v1.apps.config import DATABASE_TEST
from importExport import importStoriesData, importUserData, importActionTypes

class TestingBase(unittest.TestCase):
    def initDB(self):
        for i in range(15):
            user = User(name="TestUser" + str(i))
            user.hash_password("password")
            if i == 0:
                user.admin = True
            self.db.session.add(user)
        self.db.session.commit()

    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_TEST
        self.app = app.test_client()
        self.db = db
        self.db.create_all()
        self.initDB()

    def tearDown(self):
        self.db.session.expunge_all()
        self.db.session.flush()
        self.db.session.remove()
        self.db.session.close()
        self.db.drop_all()

    def importTestData(self):
        f = open(os.path.join(os.path.dirname(__file__), "data/users.json"), 'r')
        user_data = json.load(f)
        importUserData(user_data, self.db)
        f.close()
        f = open(os.path.join(os.path.dirname(__file__), "data/actionTypes.json"), 'r')
        action_type_data = json.load(f)
        importActionTypes(action_type_data, self.db)
        f.close()
        f = open(os.path.join(os.path.dirname(__file__), "data/stories.json"), 'r')
        story_data = json.load(f)
        importStoriesData(story_data, self.db)
        f.close()
        return True
