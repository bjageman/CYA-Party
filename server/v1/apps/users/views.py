from flask import Flask, request, jsonify, abort

import string

from . import users

from .models import User
from .utils import authenticate

from v1.apps import db
from v1.apps.utils import get_optional_data, get_required_data, generate_random_string
from .parsers import parse_user

#Error handling
from v1.apps.errors import unauthorized
from .errors import *

from v1.apps.auth import verify_auth

def get_users_player(user, game):
    for player in game.players:
        if player.user.id == user.id:
            return player

@users.route('/login', methods=['POST'])
def login_user():
    try:
        data = request.get_json()
        name = data['name']
        password = data['password']
    except (AttributeError, KeyError):
        abort(400)
    user = authenticate(name, password)
    if user is None:
        abort(401)
    return jsonify(parse_user(user))


@users.route('', methods=['GET'])
def get_user():
    user = verify_auth(request)
    return jsonify(parse_user(user))

@users.route('', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        name = get_required_data(data, "name")
        password = get_required_data(data, "password")
    except (AttributeError, KeyError):
        abort(400)
    if User.query.filter_by(guest=False).filter_by(name = name).first() is not None:
        abort(400)
    user = User(name = name)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify(parse_user(user))

@users.route('/guest', methods=['POST'])
def register_guest():
    password = "guestpass"
    data = request.get_json()
    name = get_optional_data(data, "name")
    if name is None:
        name = "guest-" + generate_random_string(10)
    else:
        name = name + "-guest"
    user = User(name = name, guest=True)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    print(parse_user(user))
    return jsonify(parse_user(user))
