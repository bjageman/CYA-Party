from testing import TestingBase
import json
from testing.utils import bytes_to_json

class RequestTests(TestingBase):

    def setUp(self):
        super().setUp()
        self.base_url = "/api/v1/"

class UserLoginTests(RequestTests):
    def setUp(self):
        super().setUp()
        self.url = self.base_url + "users"

    def test_login(self):
        name = "TestUser1"
        password = "password"
        rv = self.app.post("auth",
            data=json.dumps({
                "username": name,
                "password": password,
                }),
            content_type='application/json'
        )
        result = bytes_to_json(rv.data)
        access_token = result['access_token']
        rv = self.app.get(self.url,
            content_type='application/json',
            headers={ 'Authorization': 'JWT ' + access_token }
        )
        result = bytes_to_json(rv.data)
        assert "testuser1" in result['slug']
