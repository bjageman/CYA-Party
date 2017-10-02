import { createReducer } from 'redux-act'
import * as actions from './actions'
import { updateObjectInArray, removeItem } from 'redux/utils'

const initial = {
  editor: {
      story: {
          name: "", description: "",
          pages:[]
      },
      page: { name: "", description: "", choices: [{ name: "", description: "" }], choice: {}},
      listing: [],
      fetching: false,
  }
}



export const editor = createReducer({
    [actions.getStorySuccess]: (state, payload) => {
        return { story: payload.story, page: initial.editor.page, fetching: false }
    },
    [actions.getStoriesSuccess]: (state, payload) => {
        return { listing: payload.listing, fetching: false, story: initial.editor.story, page: initial.editor.page }
    },
    [actions.editStory]: (state, payload) => {
        return { ...state, story: payload.story }
    },
    [actions.editNewPage]: (state, payload) => {
        return { ...state, page: { ...state.page, name: payload.page.name, description: payload.page.description } }
    },
    [actions.updatePage]: (state, payload) => {
        return {
            story: {
                ...state.story,
                pages: updateObjectInArray( state.story.pages, payload.page, payload.index )
            },
            page: state.page
        }
    },
    [actions.addPage]: (state, payload) => {
        return {
            ...state,
            story: {
                ...state.story,
                pages: [...state.story.pages, payload.page]
            },
            page: initial.editor.page
        }
    },
    [actions.deletePage]: (state, payload) => {
        return {
            ...state,
            story: {
                ...state.story,
                pages: removeItem(state.story.pages, payload.index)
            }
        }
    },
    [actions.editNewChoice]: (state, payload) => {
        return {
            ...state,
            story: {
                ...state.story,
                pages: updateObjectInArray(
                    state.story.pages,
                    { ...state.story.pages[payload.index], choice: payload.choice },
                    payload.index
                )
            }
        }
    },
    [actions.updateChoice]: (state, payload) => {
        var current_page = state.story.pages[payload.page_index]
        return {
            ...state,
            story: {
                ...state.story,
                pages: updateObjectInArray(
                    state.story.pages,
                    {
                        ...current_page,
                        choices: updateObjectInArray(
                            current_page.choices,
                            payload.choice,
                            payload.index
                        ),

                    },
                    payload.page_index )
            }
        }
    },
    [actions.addChoice]: (state, payload) => {
        var current_page = state.story.pages[payload.index]
        return {
            ...state,
            story: {
                ...state.story,
                pages: updateObjectInArray(
                    state.story.pages,
                    {
                        ...current_page,
                        choice: { name: "", description: ""},
                        choices: [ ...current_page.choices, payload.choice ]
                    },
                    payload.index )
            }
        }
    },
    [actions.deleteChoice]: (state, payload) => {
        var current_page = state.story.pages[payload.page_index]
        return {
            ...state,
            story: {
                ...state.story,
                pages: updateObjectInArray(
                    state.story.pages,
                    {
                        ...current_page,
                        choices: removeItem(current_page.choices, payload.index)
                    },
                    payload.page_index )
            }
        }
    },
}, initial.editor)
