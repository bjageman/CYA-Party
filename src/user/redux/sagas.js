import * as actions from 'redux/actions';
import { put, call } from 'redux-saga/effects';
import { postAuthData, getDataApi, postDataApi, verifyData } from 'redux/api'
import { push } from 'react-router-redux'

export function* getAuthToken(action) {
    try{
      let payload = action.payload
      let data = {"username": payload.username, "password": payload.password }
      const response = yield call(postAuthData, data);
      if (verifyData(response)) {
          yield put(actions.loginSuccess({ "access_token": response.data.access_token }))
          yield put(actions.getUser({"access_token": response.data.access_token }))
          yield put(push('/profile'))
        }else{
          yield put(actions.error({ "message": response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* registerUser(action) {
    try{
      let payload = action.payload
      let data = {"username": payload.username, "password": payload.password }
      let url = 'users'
      const response = yield call(postDataApi, url, data);
      if (verifyData(response)) {
          yield put(actions.success({"message" : payload.username + " was registered!"}))
          yield put(actions.login(data))
        }else{
          yield put(actions.error({ "message": response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* getUser(action) {
    try{
      let payload = action.payload
      let url = 'users'
      const response = yield call(getDataApi, url, payload.access_token);
      if (verifyData(response)) {
          yield put(actions.loginSuccess({
              "id": response.data.id,
              "username": response.data.username,
              "campaigns": response.data.campaigns }))
        }else{
          yield put(actions.error({ "message": response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* logout(action){
    yield put(push('/'))
}
