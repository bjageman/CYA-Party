import { createReducer } from 'redux-act'
import * as actions from './actions'

const initial = {
  user: null
}

export const user = createReducer({
  [actions.logout]: (state) => {
    return null
  },
  [actions.loginSuccess]: (state, payload) => {
    return {
        "access_token" : payload.access_token,
        ...state,
        "name": payload.name,
        "id": payload.id,
         }
  }
}, initial.user)
