from v1.apps.utils import get_model
from flask import abort
from v1.apps.stories.errors import not_found
from .models import Story, Page, Choice, Action, Item

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
