from v1.apps.utils import get_model
from flask import abort
from v1.apps.stories.errors import not_found
from .models import Story, Page, Choice, Action, Item

from v1.apps import db
from v1.apps.utils import *

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
            abort(404, {'message': 'Story not found'})
        return None
    return story

def get_item(item_id, story_id=None):
    item = get_model(Item, item_id)
    if item is None:
        abort(404, {'message': 'Item not found'})
    if story_id is not None:
        story = get_story(story_id)
        if story.id != item.story.id:
            abort(400, {'message': 'Story ID does not match Item ID'})
    return item


def get_page(page_id, story_id=None):
    page = get_model(Page, page_id)
    if page is None:
        abort(404, {'message': 'Page not found'})
    if story_id is not None:
        story = get_story(story_id)
        if story.id != page.story.id:
            abort(400, {'message': 'Story ID does not match Page ID'})
    return page

def get_choice(choice_id=None, page_id=None, story_id=None):
    choice = get_model(Choice, choice_id)
    if choice is None:
        abort(404, {'message': 'Choice not found'})
    if page_id is not None:
        page = get_page(page_id)
        if page.id != choice.page.id:
            abort(404)
    if story_id is not None:
        story = get_story(story_id)
        if story.id != choice.page.story.id:
            abort(404)
    return choice

#Create

def create_story(name, owner, description=None, pages=[]):
    story = Story(name=name, owner=owner, description=description)
    print(pages)
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
    print("CHOICE CREATE", name)
    choice = Choice(name=name)
    for action in actions:
        action = create_action(action)
        choice.actions.append(action)
    return choice

#Update

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

def update_choice(choice, name, description=None, actions=None):
    if name is not None:
        choice.set_name(name)
    if description is not None:
        choice.description = description
    # if actions is not None:
    #     updateChoiceActions(choice, actions)
    db.session.add(choice)
    db.session.commit()
    return choice

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
            print(slug, "Deleted")
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
            print(slug, "Choice Deleted")
    #Create or update new/existing choices
    for choice in choices:
        choice_id = get_optional_data(choice, "id")
        name = get_optional_data(choice, "name")
        description = get_optional_data(choice, "description")
        if choice_id is None:
            choice = create_choice(name)
            page.choices.append(choice)
        else:
            choice = get_choice(choice_id, page.id)
            update_choice(choice, name)
