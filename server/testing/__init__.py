import os
import unittest
import json

from v1.apps import app, db
from v1.apps.users.models import User

from v1.apps.config import DATABASE_TEST

from importExport import importStoriesData

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

    def importTestData(self, data, type="stories", directory=os.path.dirname(__file__)):
        data = json.load(open(os.path.join(directory, data), 'r'))
        if type == "stories":
            importStoriesData(data)
