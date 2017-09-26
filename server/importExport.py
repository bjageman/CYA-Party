import sys, os, json
from v1.apps import app, db
from v1.apps.models import Image
from v1.apps.users.models import User
from v1.apps.stories.models import Story, Page, Choice, Action, Item
from v1.apps.admin.models import ActionType

from v1.apps.stories.parsers import *

import argparse

def get_optional_data(data, value, return_none=None):
    try:
        return data[value]
    except (AttributeError, KeyError, TypeError):
        return return_none

def setKeyLink(key, data_type, original_id, new_id):
    return key[data_type].update({ original_id: new_id })


def importStoriesData(data, db=db):
    for story in data:
        story_key = { "pages": {}, "items": {}} #Ensures that links to items and pages are dynamically set
        owner = User.query.get(story['owner_id'])
        image = Image(url = story['image']['url'])
        story_model = Story(
                        name=story['name'],
                        description=get_optional_data(story, "description"),
                        owner=owner,
                        image=image,
                        )
        for item in story['items']:
            item_model = Item(story=story_model, name=item['name'])
            db.session.add(item_model)
            db.session.commit()
            story_key['items'].update({ item['id'] : item_model.id })
        for page in story['pages']:
            page_model = Page(
                            story=story_model,
                            name=page['name'],
                            start=page['start'],
                            description=get_optional_data(page, "description"),
                            )
            db.session.add(page_model)
            db.session.commit()
            story_key['pages'].update({ page['id'] : page_model.id })
        for page in story["pages"]:
            page_model = Page.query.get(story_key['pages'][page['id']])
            for choice in page["choices"]:
                required_item = choice['required_item']
                if choice['required_item'] is not None:
                    required_item = story_key['items'][choice['required_item']]
                choice_model = Choice(page=page_model, name=choice['name'], required_item=required_item)
                for action in choice['actions']:
                    action_type = ActionType.query.filter_by(name=action['type']).first()
                    if action_type is not None:
                        target=action['target']
                        if target is not None and target > 0:
                            if 'GOTO_PAGE' in action_type.name:
                                target = story_key['pages'][action['target']]
                            if 'GIVE_ITEM' in action_type.name or 'TAKE_ITEM' in action_type.name:
                                target = story_key['items'][action['target']]
                        action_model = Action(name=action['name'], type=action_type, target=target)
                        choice_model.actions.append(action_model)
                print("page:", choice_model.page.id, "choice", choice_model.id, choice_model.name, len(choice_model.actions))
                db.session.add(choice_model)
            db.session.add(page_model)
        db.session.add(story_model)
    db.session.commit()
    print("Successfully imported stories")

def exportData(object, db=db):
    return parse_stories(db.session.query(object).all(), detailed=True)
    print(json.dumps(result, indent=4, sort_keys=True))

def importUserData(data, db=db):
    for user in data:
        user_model = User(name=user['name'])
        user_model.hash_password(user['password'])
        db.session.add(user_model)
    db.session.commit()
    print("Successfully imported users")

def importActionTypes(data, db=db):
    for actiontype in data:
        if ActionType.query.filter_by(name=actiontype['name']).first() is None:
            actiontype_model = ActionType(name=actiontype['name'])
            db.session.add(actiontype_model)
    db.session.commit()

parser = argparse.ArgumentParser()
parser.add_argument("-t", "--type", help="The type of data to be imported or exported [users, stories, pages]")
parser.add_argument("-i", "--import_file", help="Imports the given file")
parser.add_argument("-e", "--export", help="Exports the given file")
parser.parse_args()

if __name__ == '__main__':
    args = parser.parse_args()
    if args.import_file is None and args.export is None:
        print('please provide an input file')
        sys.exit()
    if args.import_file is not None:
        data = json.load(open(os.path.join(os.path.dirname(__file__), args.import_file), 'r'))
        if args.type is None or args.type == "stories":
            importStoriesData(data)
        if args.type == "users":
            importUserData(data)
        if args.type == "actiontype":
            importActionTypes(data)
    if args.export is not None:
        print(json.dumps(exportData(Story), indent=4, sort_keys=True))
