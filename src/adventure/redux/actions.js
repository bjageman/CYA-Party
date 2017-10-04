import { createAction } from 'redux-act'

export const getStory = createAction('Get an existing object')
export const getStorySuccess = createAction('Successfully recieved story data')

export const getStories = createAction('Request a list of objects')
export const getStoriesSuccess = createAction('Successfully recieved a list of objects')

//Play Actions
export const socketStart = createAction('Start a WebSocket')
export const socketStop = createAction('Disconnect from WebSocket')

//Game Sessions
export const createSession = createAction('Create a session for the game')
export const joinSession = createAction('Join a session')
export const startSession = createAction('Start a session')
export const quitSession = createAction('Quit a session')
export const voteChoice = createAction('Vote on a specific choice')
export const voteChoiceSuccess = createAction('Successfully voted on a specific choice')

export const getSessionSuccess = createAction('Successfully received session data')
export const getPageSuccess = createAction('Successfully received page data')
export const getSessions = createAction('Request a list of available games')
export const getSessionsSuccess = createAction('Successfully received list of available games')

//Editor Options
export const getTools = createAction('Request a set of available tools for the editor')
export const getToolsSuccess = createAction('Successfully received tools data')
//Story
export const saveStory = createAction('Save a new or existing story')
export const deleteStory = createAction('Delete an existing object')
export const updateStory = createAction('Update an existing story')
//Page
export const updatePage = createAction('Update a current page')
export const addPage = createAction('Add a new page')
export const deletePage = createAction('Delete an existing page')
//Choice
export const updateChoice = createAction('Update a current choice')
export const addChoice = createAction('Add a new choice')
export const deleteChoice = createAction('Delete an existing page')
//Action
export const updateAction = createAction('Update a current action')
export const addAction = createAction('Add a new action')
export const deleteAction = createAction('Deletes the current action')
