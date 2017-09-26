import { combineReducers } from 'redux'

import { createReducer } from 'redux-act'
import * as actions from './actions'

import { user } from 'user/redux/reducers'
import { story } from 'story/redux/reducers'

import { routerReducer as router } from 'react-router-redux'

const initial = {
  response: {
    success: null,
    error: null,
  },
}

export const response = createReducer({
  [actions.success]: (state, payload) => {
    return { success: payload.message, loading: false }
  },
  [actions.error]: (state, payload) => {
    return { error: payload.message || "Unknown Error", loading: false }
  },
  [actions.clear]: (state, payload) => {
    return { error: null, success: null }
  }
}, initial.response)


export default combineReducers(
  { response, user, router, story }
)
