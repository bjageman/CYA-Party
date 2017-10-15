import * as actions from 'redux/actions'
import { put, call } from 'redux-saga/effects'
import { postAuthData, getDataApi, postDataApi } from 'redux/api'
import { push } from 'react-router-redux'

export function* getAuthToken(action) {
    try{
      let payload = action.payload
      let data = {"username": payload.name, "password": payload.password }
      const response = yield call(postAuthData, data)
      if (response.status === 200) {
          yield put(actions.authSuccess({ "access_token": response.data.access_token }))
          yield put(actions.getUser({"access_token": response.data.access_token }))
          yield put(push('/story'))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* registerUser(action) {
    try{
      let payload = action.payload
      let data = {}
      let url = ""
      if (payload.guest) {
          url = 'users/guest'
      }else{
          data = {"name": payload.name, "password": payload.password }
          url = 'users'
      }
      const response = yield call(postDataApi, url, data)
      if (response.status === 200) {
          yield put(actions.success({"message" : response.data.name + " was registered!"}))
          if (response.data.guest) {
              yield put(actions.login({name: response.data.name, password: "guestpass"}))
          }else{
              yield put(actions.login(data))
          }
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* getUser(action) {
    try{
      let payload = action.payload
      let url = 'users'
      const response = yield call(getDataApi, url, payload.access_token)
      if (response.status === 200) {
          yield put(actions.loginSuccess({ "data": response.data }))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* logout(action){
    yield put(push('/'))
}
