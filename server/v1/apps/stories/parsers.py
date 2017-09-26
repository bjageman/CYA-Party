from v1.apps.parsers import parse_base, parse_image
from v1.apps.users.parsers import parse_user
from v1.apps.admin.parsers import parse_action_type, parse_action_types

def parse_stories(stories, detailed=False):
    story_set = []
    for story in stories:
        story_set.append(parse_story(story, detailed))
    return(story_set)

def parse_story(story, detailed=True):
    try:
        result = parse_base(story)
        if (detailed):
            pages = parse_pages(story.pages, detailed)
        else:
            pages = []
            for page in story.pages:
                pages.append(page.id)
        result.update({
            "pages": pages,
            "owner": parse_user(story.owner),
            "items" : parse_items(story.items),
            })
        return result
    except AttributeError:
        return None

def parse_pages(pages, detailed=False):
    page_set = []
    for page in pages:
        page_set.append(parse_page(page, detailed))
    return(page_set)

def parse_page(page, detailed=True):
    try:
        result = parse_base(page)
        if (detailed):
            result.update({
                "start": page.start,
                "choices": parse_choices(page.choices)
                })
        return result
    except AttributeError as e:
        return None

def parse_choices(choices):
    choice_set = []
    for choice in choices:
        choice_set.append(parse_choice(choice))
    return(choice_set)

def parse_choice(choice):
    try:
        result = parse_base(choice)
        result.update({
            "required_item": choice.required_item,
            "actions": parse_actions(choice.actions)
        })
        return result
    except AttributeError:
        return None

def parse_actions(actions):
    action_set = []
    for action in actions:
        action_set.append(parse_action(action))
    return(action_set)

def parse_action(action):
    try:
        result = parse_base(action)
        target = "herpderp"
        if action.page is not None:
            target = parse_page(action.page, detailed=False)
        elif action.item is not None:
            target = parse_item(action.item)
        else:
            target = action.target
        result.update({
            "type": parse_action_type(action.type),
            "target": target,
        })
        return result
    except AttributeError as e:
        print(e)
        return None

def parse_items(items):
    item_set = []
    for item in items:
        item_set.append(parse_item(item))
    return(item_set)

def parse_item(item):
    try:
        result = parse_base(item)
        result.update({
            "name": item.name,
        })
        return result
    except AttributeError as e:
        print(e)
        return None

def parse_sessions(sessions):
    session_set = []
    for session in sessions:
        session_set.append(parse_session(session))
    return(session_set)

def parse_session(session):
    try:
        result = parse_base(session)
        result.update({
            "story": parse_story(session.story, False),
            "players": parse_players(session.players),
        })
        return result
    except AttributeError as e:
        print(e)
        return None

def parse_players(players):
    player_set = []
    for player in players:
        player_set.append(parse_player(player))
    return(player_set)

def parse_player(player):
    try:
        result = parse_base(player)
        result.update({
            "user": parse_user(player.user),
            "inventory": parse_items(player.inventory),
        })
        return result
    except AttributeError as e:
        print(e)
        return None
