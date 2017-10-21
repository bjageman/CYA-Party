from v1.apps.utils import get_model
from flask import abort
from v1.apps.stories.errors import not_found
from .models import Story, Page, Choice, Action, Item

from v1.apps import db
from v1.apps.utils import *
from v1.apps.admin.utils import get_command


def deleteObject(object, db):
    slug = object.slug
    db.session.delete(object)
    db.session.commit()
    return slug

#Getters

def get_story(story_id, required=True):
    story = get_model(Story, story_id)
    if story is None:
        if required is True:
            print("Story", story_id, "Not found")
            return None
            # abort(404, {'message': 'Story not found'})
        return None
    return story

def get_item(item_id, story_id=None):
    item = get_model(Item, item_id)
    if item is None:
        print("Item", item_id, "Not found")
        return None
        # abort(404, {'message': 'Item not found'})
    if story_id is not None:
        story = get_story(story_id)
        if story.id != item.story.id:
            abort(400, {'message': 'Story ID does not match Item ID'})
    return item


def get_page(page_id, story_id=None):
    page = get_model(Page, page_id)
    if page is None:
        print("Page", page_id, "Not found")
        return None
        # abort(404, {'message': 'Page not found'})
    if story_id is not None:
        story = get_story(story_id)
        if story.id != page.story.id:
            abort(400, {'message': 'Story ID does not match Page ID'})
    return page

def get_choice(choice_id=None, page_id=None, story_id=None):
    choice = get_model(Choice, choice_id)
    if choice is None:
        print("Choice", choice_id, "Not found")
        return None
        # abort(404, {'message': 'Choice not found'})
    if page_id is not None:
        page = get_page(page_id)
        if page.id != choice.page.id:
            abort(404)
    if story_id is not None:
        story = get_story(story_id)
        if story.id != choice.page.story.id:
            abort(404)
    return choice

def get_action(action_id, choice_id=None, page_id=None, story_id=None):
    action = get_model(Action, action_id)
    if action is None:
        return None
        # abort(404, {'message': 'Action not found'})
    if choice_id is not None:
        choice = get_choice(choice_id)
        if choice.id != action.choice.id:
            abort(404)
    if page_id is not None:
        page = get_page(page_id)
        if page.id != action.choice.page.id:
            abort(404)
    if story_id is not None:
        story = get_story(story_id)
        if story.id != action.choice.page.story.id:
            abort(404)
    return action

#Create

def create_story(name, owner, description=None, pages=[]):
    story = Story(name=name, owner=owner, description=description)
    for page in pages:
        name = get_required_data(page, "name")
        description = get_optional_data(page, "description")
        choices = get_optional_data(page, "choices", return_none=[])
        page = create_page(name, description, choices)
        story.pages.append(page)
    return story

def create_page(name, description, choices=[]):
    page = Page(name=name, description=description)
    for choice in choices:
        name = get_required_data(choice, "name")
        actions = get_optional_data(choice, "actions", return_none=[])
        choice = create_choice(name, actions)
        page.choices.append(choice)
    return page

def create_choice(name, actions = []):
    choice = Choice(name=name)
    for action in actions:
        name = get_required_data(action, "name")
        command = get_optional_data(action, "command")
        target = get_optional_data(action, "target")
        action = create_action(name, command, target)
        choice.actions.append(action)
    return choice

def create_action(name, command=None, target=None):
    page = None
    item = None
    if command is not None:
        slug = get_required_data(command, "slug")
        command = get_command(slug)
        try:
            if command.target == "PAGE":
                page = get_page(target)
                target = page.id
            if command.target == "ITEM":
                item = get_item(target)
                target = item.id
        except AttributeError:
            print("Invalid Action Target")
            item = None
            page = None
            target = None
    action = Action(name=name, command=command, target=target, page=page, item=item)
    return action


#Update

def update_story(story, name, description=None, pages=None):
    if name is not None:
        story.set_name(name)
    if description is not None:
        story.description = description
    if pages is not None:
        story = updateStoryPages(story, pages)
    return story

def update_page(page, name, description=None, choices=None):
    if name is not None:
        page.set_name(name)
    if description is not None:
        page.description = description
    if choices is not None:
        updatePageChoices(page, choices)
    db.session.add(page)
    db.session.commit()
    return page

def update_choice(choice, name, actions=None):
    if name is not None:
        choice.set_name(name)
    if actions is not None:
        updateChoiceActions(choice, actions)
    db.session.add(choice)
    db.session.commit()
    return choice

def update_action(action, name, command=None, target=None):
    if name is not None:
        action.set_name(name)
    if command is not None:
        slug = get_required_data(command, "slug")
        command = get_command(slug)
        action.command = command
        try:
            if command.target == "PAGE":
                page = get_page(target)
                action.page = get_page(target)
                action.target = page.id
            elif command.target == "ITEM":
                item = get_item(target)
                action.item = item
                action.target = item.id
            else:
                action.target = target
        except (NameError, AttributeError):
            action.target = None
            action.page = None
            action.item = None
    db.session.add(action)
    db.session.commit()
    return action

#If a list of pages is included, parse through the pages updating, creating, or deleting each one
def updateStoryPages(story, pages):
    #Verify that pages were removed and if so, delete
    for original_page in story.pages:
        delete = True
        for new_page in pages:
            page_id = get_optional_data(new_page, "id")
            if page_id == original_page.id:
                delete = False
        if delete:
            slug = deleteObject(original_page, db)
    #Create or update new/existing pages
    for page in pages:
        name = get_optional_data(page, "name")
        page_id = get_optional_data(page, "id")
        description = get_optional_data(page, "description")
        choices = get_optional_data(page, "choices", return_none=[])
        if page_id is None:
            page = create_page(name, description, choices)
            story.pages.append(page)
        else:
            page = get_page(page_id, story.id)
            update_page(page, name, description, choices)
    return story

def updatePageChoices(page, choices):
    #Verify that choices were removed and if so, delete
    for original_choice in page.choices:
        delete = True
        for new_choice in choices:
            choice_id = get_optional_data(new_choice, "id")
            if choice_id == original_choice.id:
                delete = False
        if delete:
            slug = deleteObject(original_choice, db)
    #Create or update new/existing choices
    for choice in choices:
        choice_id = get_optional_data(choice, "id")
        name = get_optional_data(choice, "name")
        actions = get_optional_data(choice, "actions")
        if choice_id is None:
            choice = create_choice(name, actions=actions)
            page.choices.append(choice)
        else:
            choice = get_choice(choice_id, page.id)
            update_choice(choice, name, actions=actions)

def updateChoiceActions(choice, actions):
    #Verify that actions were removed and if so, delete
    for original_action in choice.actions:
        delete = True
        for new_action in actions:
            action_id = get_optional_data(new_action, "id")
            if action_id == original_action.id:
                delete = False
        if delete:
            slug = deleteObject(original_action, db)
    #Create or update new/existing actions
    for action in actions:
        action_id = get_optional_data(action, "id")
        name = get_optional_data(action, "name")
        command = get_optional_data(action, "command")
        target = get_optional_data(action, "target")
        if action_id is None:
            action = create_action(name, command, target)
            choice.actions.append(action)
        else:
            action = get_action(action_id, choice.id)
            update_action(action, name, command, target)
