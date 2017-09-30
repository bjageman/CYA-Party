import { createAction } from 'redux-act'

export const getStory = createAction('Get an existing object')
export const getStorySuccess = createAction('Successfully recieved story data')

export const getStories = createAction('Request a list of objects')
export const getStoriesSuccess = createAction('Successfully recieved a list of objects')

export const saveStory = createAction('Save a new or existing story')
export const deleteStory = createAction('Delete an existing object')
export const updateStory = createAction('Update an existing story')

//Temp data actions
export const editStory = createAction('A change has been made to a temporary story')
//Page
export const editNewPage = createAction('Edit the new page data')
export const updatePage = createAction('Update a current page')
export const addPage = createAction('Add a new page')
export const deletePage = createAction('Delete an existing page')
//Choice
export const editNewChoice = createAction('Edit the new choice data')
export const updateChoice = createAction('Update a current choice')
export const addChoice = createAction('Add a new choice')
export const deleteChoice = createAction('Delete an existing page')
//Action
export const editNewAction = createAction('Edit the new action data')
export const updateAction = createAction('Update a current action')
export const addAction = createAction('Add a new action')
