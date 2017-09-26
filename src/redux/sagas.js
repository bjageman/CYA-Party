import { takeEvery } from 'redux-saga/effects'
import * as actions from './actions'

import { registerUser, getAuthToken, getUser, logout } from 'user/redux/sagas'

import editSagas from 'story/redux/sagas'

export default function* rootSaga() {
  //User
  yield takeEvery(actions.register, registerUser)
  yield takeEvery(actions.login, getAuthToken)
  yield takeEvery(actions.getUser, getUser)
  yield takeEvery(actions.logout, logout)
  yield editSagas()
}
