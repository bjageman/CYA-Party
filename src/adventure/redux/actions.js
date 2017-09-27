import { createAction } from 'redux-act'

export const getItem = createAction('Get an existing object')
export const getStorySuccess = createAction('Successfully recieved a list of stories')

export const getItems = createAction('Request a list of objects')
export const getItemsSuccess = createAction('Successfully recieved a list of objects')

export const saveItem = createAction('Save a new or existing object')
export const deleteItem = createAction('Delete an existing object')
export const successStory = createAction('A story request succeeded')
