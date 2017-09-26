import { createReducer } from 'redux-act'
import * as actions from './actions'

const initial = {
  story: null
}

export const story = createReducer({
    [actions.successStory]: (state, payload) => {
        return payload.data
    },
    [actions.getStoriesSuccess]: (state, payload) => {
        return { "listing": payload.listing }
    }
}, initial.story)
