from testing import TestingBase
import json
from testing.utils import bytes_to_json

class RequestTests(TestingBase):

    def setUp(self):
        super().setUp()
        self.base_url = "/api/v1/"

    def createUser(self, username, password):
        rv = self.app.post("auth",
            data=json.dumps({
                "username": username,
                "password": password,
                }),
            content_type='application/json'
        )
        result = bytes_to_json(rv.data)
        return result['access_token']

class StoryTestingBase(RequestTests):
    def setUp(self):
        super().setUp()
        self.url = self.base_url + "stories"
        self.access_token = self.createUser("TeStUser1", "password")
        self.createActionType(json.dumps({ "name": "GOTO PAGE" }))
        self.createActionType(json.dumps({ "name": "GET ITEM" }))

    def postData(self, url, data):
        rv = self.app.post(url,
            content_type='application/json', headers={ 'Authorization': 'JWT ' + self.access_token }, data=data )
        return bytes_to_json(rv.data)

    def getData(self, url):
        rv = self.app.get(url, headers={ 'Authorization': 'JWT ' + self.access_token })
        return bytes_to_json(rv.data)

    def getStory(self, story_id):
        url = self.url + "/" + story_id
        return(self.getData(url))

    def getChoice(self, story_id, page_id, choice_id):
        url = self.url + "/" + story_id + "/pages/" + page_id + "/choices/" + choice_id
        return self.getData(url)

    def createStory(self, data):
        return self.postData(self.url, data)

    def createPage(self, story_id, data):
        url = self.url + "/" + story_id + "/pages"
        return self.postData(url, data)

    def createChoice(self, story_id, page_id, data):
        url = self.url + "/" + story_id + "/pages/" + page_id + "/choices"
        return self.postData(url, data)

    def createAction(self, story_id, page_id, choice_id, data):
        url = self.url + "/" + story_id + "/pages/" + page_id + "/choices/" + choice_id + "/actions"
        return self.postData(url, data)

    def createActionType(self, data):
        url = self.base_url + "admin/action_types"
        return self.postData(url, data)

class UserLoginTests(RequestTests):
    def setUp(self):
        super().setUp()
        self.url = self.base_url + "users"

    def test_login(self):
        access_token = self.createUser("TeStUser1", "password")
        rv = self.app.get(self.url,
            content_type='application/json',
            headers={ 'Authorization': 'JWT ' + access_token }
        )
        result = bytes_to_json(rv.data)
        assert "testuser1" in result['slug']

class StoryCreationTests(StoryTestingBase):

    def test_create_story(self):
        pass
