import { createReducer } from 'redux-act'
import * as actions from './actions'

const initial = {
  adventure: null
}

export const adventure = createReducer({
    [actions.successStory]: (state, payload) => {
        return { story: payload.story, listing: payload.listing, fetching: false }
    },
    [actions.getItemsSuccess]: (state, payload) => {
        return { listing: payload.listing, data: null }
    }
}, initial.adventure)
