from flask import Flask, request, jsonify, abort
#App Specific
from . import admin
from .models import Command
from .parsers import parse_command, parse_commands
from .utils import get_command
#Utilities/Tools
from v1.apps import socketio, db
from v1.apps.errors import *
from v1.apps.utils import get_required_data, get_optional_data, get_model

##
#  Admin Tools
##

url_base_commands = "/commands"

@admin.route(url_base_commands, methods=['GET'])
def get_commands_request():
    commands = Command.query.all()
    return jsonify(parse_commands(commands))

@admin.route(url_base_commands + '/<commands_id>', methods=['GET'])
def get_command_request(command_id):
    command = get_command(command_id)
    return jsonify(parse_command(command))

@admin.route(url_base_commands, methods=['POST', 'PUT'])
def create_command():
    data = request.get_json()
    name = get_required_data(data, "name")
    command = Command(name=name)
    db.session.add(command)
    db.session.commit()
    return jsonify(parse_command(command))

@admin.route(url_base_commands + '/<commands_id>', methods=['POST', 'PUT'])
def update_command(command_id):
    command = get_command(command_id)
    data = request.get_json()
    name = get_optional_data(data, "name")
    if name is not None:
        command.set_name(name)
    db.session.add(command)
    db.session.commit()
    return jsonify(parse_command(command))

@admin.route(url_base_commands + '/<commands_id>', methods=['DELETE'])
def delete_command(command_id):
    command = get_command(command_id)
    slug = command.slug
    db.session.delete(command)
    return jsonify({"deleted": slug})
