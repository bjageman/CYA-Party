import sys, os, json
from v1.apps import app, db
from v1.apps.models import Image
from v1.apps.users.models import User
from v1.apps.stories.models import Story, Page, Choice, Action, Item
from v1.apps.admin.models import Command

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
    if isinstance(data, (dict)):
        data = [data]
    for story in data:
        story_key = { "pages": {}, "items": {}} #Ensures that links to items and pages are dynamically set
        owner = User.query.filter_by(name=story['owner']['name']).first()
        try:
            image = Image(url = story['image']['url'])
        except TypeError:
            image = None
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
                    command = Command.query.filter_by(slug=action['command']['slug']).first()
                    if command is not None:
                        try:
                            target = int(action['target'])
                            target_item = None
                            target_page = None
                            if 'goto-page' in command.slug:
                                target = story_key['pages'][target]
                                target_page = Page.query.get(target)
                            elif 'give-item' in command.slug or 'take-item' in command.slug:
                                target = story_key['items'][target]
                                target_item = Item.query.get(story_key['items'][target])
                            action_model = Action(name=action['name'], command=command, target=target, item=target_item, page=target_page)
                            choice_model.actions.append(action_model)
                        except TypeError:
                            print("Target FAIL")
                db.session.add(choice_model)
            db.session.add(page_model)
        db.session.add(story_model)
    db.session.commit()
    print("Imported", len(data), "stories")

def exportData(object, slug=None, db=db):
    if slug is None or slug is "all":
        result = parse_stories(db.session.query(object).all(), detailed=True)
    else:
        result = parse_story(db.session.query(object).filter_by(slug=slug).first(), detailed=True)
    return result

def importUserData(data, db=db):
    for user in data:
        user_model = User(name=user['name'])
        user_model.hash_password(user['password'])
        db.session.add(user_model)
    db.session.commit()
    print("Imported", len(data), "users")

def importCommands(data, db=db):
    count = 0
    for command in data:
        if Command.query.filter_by(name=command['name']).first() is None:
            command_model = Command(name=command['name'], target=command['target'])
            db.session.add(command_model)
            count = count + 1
    db.session.commit()
    print("Imported", count, "commands")

parser = argparse.ArgumentParser()
parser.add_argument("-t", "--type", help="The type of data to be imported or exported [users, stories, pages]")
parser.add_argument("-i", "--import_file", help="Imports the given file")
parser.add_argument("-e", "--export", help="Exports the given file")

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
        if args.type == "command":
            importCommands(data)
    if args.export is not None:
        data = exportData(Story, slug=args.export)
        print(json.dumps(data, indent=4, sort_keys=True))
