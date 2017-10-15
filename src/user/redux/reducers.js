import { createReducer } from 'redux-act'
import * as actions from './actions'

const initial = {
  user: {},
}

export const user = createReducer({
  [actions.logout]: (state) => {
    return {}
  },
  [actions.authSuccess]: (state, payload) => {
      return {
          ...state,
          "access_token": payload.access_token
      }
  },
  [actions.loginSuccess]: (state, payload) => {
    return {
        ...state,
        "name": payload.data.name,
        "id": payload.data.id,
        "guest": payload.data.guest,
         }
  }
}, initial.user)
