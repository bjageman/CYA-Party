import { createAction } from 'redux-act'

export const getStory = createAction('Get an existing story')
export const getStorySuccess = createAction('Successfully recieved a list of stories')

export const getStories = createAction('Request a list of stories')
export const getStoriesSuccess = createAction('Successfully recieved a list of stories')

export const saveStory = createAction('Save a new or existing story')
export const deleteStory = createAction('Delete an existing story')
export const successStory = createAction('A story request succeeded')
