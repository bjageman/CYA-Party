export function processSpecificItemURL(story_id, page_id, choice_id, action_id){
    let url = ""
    if (story_id){
        url += "editor/" + story_id
    }else{
        return false
    }
    if (story_id && page_id){
        url += "/pages/" + page_id
    }
    if (story_id && page_id && choice_id){
        url += "/choices/" + choice_id
    }
    return url
}

export function processListingURL(story_id, page_id, choice_id, action_id){
    let url = "editor"
    if (story_id){
        url = "editor/" + story_id + "/pages"
    }
    if (story_id && page_id){
        url += "/" + page_id + "/choices"
    }
    if (choice_id){
        if (page_id){
            url += "/actions"
        }else{
            return false
        }
    }
    return url
}
