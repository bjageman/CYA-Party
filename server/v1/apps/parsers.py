def parse_base(model):
    try:
        return ({
            "id": model.id,
            "name": model.name,
            "slug": model.slug,
            "created": model.created.strftime("%b %d %Y %I:%M%p"),
            "updated": model.updated.strftime("%b %d %Y %I:%M%p")
        })
    except AttributeError:
        return None

def parse_image(image):
    try:
        result = parse_base(image)
        result.update({
            "url": image.url,
            "blob": image.blob,
        })
        return result
    except AttributeError:
        return None
