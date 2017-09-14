from . import TestingBase
from collections import Counter

from v1.apps.users.models import User

class DBTests(TestingBase):
    def test_user_login(self):
        name = "TestUser1"
        correct_password = "password"
        incorrect_password = "Password"
        user = User.query.filter_by(name=name).first()
        assert name in user.name
        assert user.verify_password(correct_password)
        assert not user.verify_password(incorrect_password)
