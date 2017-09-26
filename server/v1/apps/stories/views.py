from flask import request, jsonify, abort
from flask_jwt import jwt_required, current_identity
#App Specific
from . import stories
from .models import Story, Page, Choice, Action
from v1.apps.stories.parsers import *
from v1.apps.stories.errors import *
from v1.apps.stories.utils import *
#Utilities/Tools
from v1.apps.admin.models import ActionType
from v1.apps import socketio, db
from v1.apps.errors import *
from v1.apps.utils import get_required_data, get_optional_data

##
#  Stories
##

@stories.route('', methods=['GET'])
@jwt_required()
def get_stories():
    stories = Story.query.all()
    return jsonify(parse_stories(stories))

@stories.route('/<story_id>', methods=['GET'])
def get_story_request(story_id):
    story = get_story(story_id)
    return jsonify(parse_story(story))

@stories.route('', methods=['POST', 'PUT'])
@jwt_required()
def create_story():
    data = request.get_json()
    name = get_required_data(data, "name")
    story = Story(name=name)
    db.session.add(story)
    db.session.commit()
    return jsonify(parse_story(story))

@stories.route('/<story_id>', methods=['POST', 'PUT'])
@jwt_required()
def update_story(story_id):
    story = get_story(story_id)
    data = request.get_json()
    name = get_optional_data(data, "name")
    if name is not None:
        story.set_name(name)
    db.session.add(story)
    db.session.commit()
    return jsonify(parse_story(story))

@stories.route('/<story_id>', methods=['DELETE'])
@jwt_required()
def delete_story(story_id):
    story = get_story(story_id)
    slug = story.slug
    db.session.delete(story)
    return jsonify({"deleted": slug})

##
#  Items
##

url_base_items = "/<story_id>/items"

@stories.route(url_base_items, methods=['GET'])
def get_items(story_id):
    story = get_story(story_id)
    return jsonify(parse_items(story.items))

@stories.route(url_base_items + '/<item_id>', methods=['GET'])
def get_item_request(story_id, item_id):
    item = get_item(item_id, story_id)
    return jsonify(parse_item(item))

@stories.route(url_base_items, methods=['POST', 'PUT'])
@jwt_required()
def create_item(story_id):
    story = get_story(story_id)
    data = request.get_json()
    name = get_required_data(data, "name")
    item = Item(name=name)
    story.items.append(item)
    db.session.add(story)
    db.session.commit()
    return jsonify(parse_item(item))

@stories.route(url_base_items + '/<item_id>', methods=['POST', 'PUT'])
@jwt_required()
def update_item(story_id, item_id):
    item = get_item(item_id, story_id)
    data = request.get_json()
    name = get_optional_data(data, "name")
    if name is not None:
        item.set_name(name)
    db.session.add(item)
    db.session.commit()
    return jsonify(parse_item(item))

@stories.route(url_base_items + '/<item_id>', methods=['DELETE'])
@jwt_required()
def delete_item(story_id, item_id):
    item = get_item(item_id, story_id)
    slug = item.slug
    db.session.delete(item)
    return jsonify({"deleted": slug})

##
#  Pages
##

url_base_pages = "/<story_id>/pages"

@stories.route(url_base_pages, methods=['GET'])
def get_pages(story_id):
    story = get_story(story_id)
    return jsonify(parse_pages(story.pages))

@stories.route(url_base_pages + '/<page_id>', methods=['GET'])
def get_page_request(story_id, page_id):
    page = get_page(page_id, story_id)
    return jsonify(parse_page(page))

@stories.route(url_base_pages, methods=['POST', 'PUT'])
@jwt_required()
def create_page(story_id):
    story = get_story(story_id)
    data = request.get_json()
    name = get_required_data(data, "name")
    choices = get_optional_data(data, "choices")
    page = Page(name=name)
    story.pages.append(page)
    db.session.add(story)
    db.session.commit()
    return jsonify(parse_page(page))

@stories.route(url_base_pages + '/<page_id>', methods=['POST', 'PUT'])
@jwt_required()
def update_page(story_id, page_id):
    page = get_page(page_id, story_id)
    data = request.get_json()
    name = get_optional_data(data, "name")
    if name is not None:
        page.set_name(name)
    db.session.add(page)
    db.session.commit()
    return jsonify(parse_page(page))

@stories.route(url_base_pages + '/<page_id>', methods=['DELETE'])
@jwt_required()
def delete_page(story_id, page_id):
    page = get_page(page_id, story_id)
    slug = page.slug
    db.session.delete(page)
    return jsonify({"deleted": slug})

##
#  Choices
##

url_base_choices = url_base_pages + "/<page_id>/choices"

@stories.route(url_base_choices, methods=['GET'])
def get_choices(story_id, page_id):
    page = get_page(page_id, story_id)
    return jsonify(parse_choices(page.choices))

@stories.route(url_base_choices + '/<choice_id>', methods=['GET'])
def get_choice_request(story_id, page_id, choice_id):
    choice = get_choice(choice_id, page_id, story_id)
    return jsonify(parse_choice(choice))

@stories.route(url_base_choices, methods=['POST', 'PUT'])
def create_choice_request(story_id, page_id):
    page = get_page(page_id, story_id)
    data = request.get_json()
    name = get_required_data(data, "name")
    actions = get_optional_data(data, "actions", return_none=[])
    choice = create_choice(name, actions)
    page.choices.append(choice)
    db.session.add(page)
    db.session.commit()
    return jsonify(parse_choice(choice))

def create_choice(name, actions = []):
    choice = Choice(name=name)
    for action_data in actions:
        action = create_action(action_data)
        choice.actions.append(action)
    return choice

@stories.route(url_base_choices + '/<choice_id>', methods=['DELETE'])
@jwt_required()
def delete_choice(story_id, page_id, choice_id):
    choice = get_choice(choice_id, page_id, story_id)
    slug = choice.slug
    db.session.delete(choice)
    return jsonify({"deleted": slug})

##
#  Actions
##

url_base_actions = url_base_choices + "/<choice_id>/actions"

@stories.route(url_base_actions, methods=['GET'])
def get_actions(story_id, page_id, choice_id):
    choice = get_choice(choice_id, page_id, story_id)
    return jsonify(parse_actions(choice.actions))

@stories.route(url_base_actions, methods=['POST', 'PUT'])
def create_action_request(story_id, page_id, choice_id):
    choice = get_choice(choice_id, page_id, story_id)
    data = request.get_json()
    name = get_required_data(data, "name")
    target = get_required_data(data, "target")
    action_type = get_required_data(data, "type")
    action = create_action(name, target, action_type)
    choice.actions.append(action)
    db.session.add(choice)
    db.session.commit()
    return jsonify(parse_action(action))

def create_action(name, target, action_type):
    action_type_model = get_model(ActionType, action_type)
    if action_type_model is None:
        abort(404, {'message': 'Action Type not found'})
    return Action(name=name, target=target, type=action_type_model)
