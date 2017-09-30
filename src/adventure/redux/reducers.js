import { createReducer } from 'redux-act'
import * as actions from './actions'
import { updateObjectInArray, insertItem, removeItem } from 'redux/utils'
import { Map, List } from 'immutable'

const initial = {
  editor: {
      story: {
          name: "", description: "",
          pages:[{
              choice: {  name: "", description: "", },
              choices: []
          }]
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
        console.log(payload.index, state.story.pages[payload.index], payload.choice)
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
                    payload.index )
            }
        }
    },
    [actions.addChoice]: (state, payload) => {
        var current_page = state.story.pages[payload.index]
        console.log(payload.index, current_page)
        return {
            ...state,
            story: {
                ...state.story,
                pages: updateObjectInArray(
                    state.story.pages,
                    {
                        ...current_page,
                        choice: initial.editor.story.pages[0].choice ,
                        choices: [ ...current_page.choices, payload.choice ]
                    },
                    payload.index )
            }
        }
    },
    // [actions.deleteChoice]: (state, payload) => {
    //     return {
    //         ...state,
    //         story: {
    //             ...state.story,
    //             pages: removeItem(state.story.pages, payload.index)
    //         }
    //     }
    // },
}, initial.editor)
