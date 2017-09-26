from flask import Flask, request, jsonify, abort
#App Specific
from . import admin
from .models import ActionType
from .parsers import parse_action_type, parse_action_types

#Utilities/Tools
from v1.apps import socketio, db
from v1.apps.errors import *
from v1.apps.utils import get_required_data, get_optional_data, get_model

##
#  Admin Tools
##

#Action Types
def get_action_type(action_type_id):
    action_type = get_model(ActionType, action_type_id)
    if action_type is None:
        abort(404)
    return action_type

url_base_action_types = "/action_types"

@admin.route(url_base_action_types, methods=['GET'])
def get_action_types():
    action_types = ActionType.query.all()
    return jsonify(parse_action_types(action_types))

@admin.route(url_base_action_types + '/<action_types_id>', methods=['GET'])
def get_action_type_request(action_type_id):
    action_type = get_action_type(action_type_id)
    return jsonify(parse_action_type(action_type))

@admin.route(url_base_action_types, methods=['POST', 'PUT'])
def create_action_type():
    data = request.get_json()
    name = get_required_data(data, "name")
    action_type = ActionType(name=name)
    db.session.add(action_type)
    db.session.commit()
    return jsonify(parse_action_type(action_type))

@admin.route(url_base_action_types + '/<action_types_id>', methods=['POST', 'PUT'])
def update_action_type(action_type_id):
    action_type = get_action_type(action_type_id)
    data = request.get_json()
    name = get_optional_data(data, "name")
    if name is not None:
        action_type.set_name(name)
    db.session.add(action_type)
    db.session.commit()
    return jsonify(parse_action_type(action_type))

@admin.route(url_base_action_types + '/<action_types_id>', methods=['DELETE'])
def delete_action_type(action_type_id):
    action_type = get_action_type(action_type_id)
    slug = action_type.slug
    db.session.delete(action_type)
    return jsonify({"deleted": slug})
