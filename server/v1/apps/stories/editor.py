from v1.apps import socketio, db
from v1.apps.utils import *

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
    for page in pages:
        name = get_optional_data(page, "name")
        page_id = get_optional_data(page, "id")
        description = get_optional_data(page, "description")
        if page_id is None:
            create_page(story, name, description)
        else:
            page = get_page(page_id, story.id)
            update_page(page, name, description)


def update_page(page, name, description):
    if name is not None:
        page.set_name(name)
    if name is not None:
        page.description = description
    db.session.add(page)
    db.session.commit()
    return True

def create_page(story, name, description):
    page = Page(name=name, description=description)
    story.pages.append(page)
    db.session.add(story)
    db.session.commit()
