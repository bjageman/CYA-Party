import * as actions from 'redux/actions'
import { put, call, takeEvery } from 'redux-saga/effects'
import { getDataApi, postDataApi } from 'redux/api'
import { push } from 'react-router-redux'

export function* saveStory(action) {
    try{
      let payload = action.payload
      let url = "stories"
      if (payload.story_id) {
          url += "/" + payload.story_id
      }
      console.log(url)
      let data = {
          "name": payload.name,
          "description": payload.description
      }
      const response = yield call(postDataApi, url, data, payload.access_token)
      if (response.status === 200) {
          yield put(actions.successStory({ "data": response.data }))
          yield put(actions.success({ "message": response.data.name + " is saved!" }))
          yield put(push("/story/edit"))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* getStory(action) {
    try{
      let payload = action.payload
      let url = "stories/" + payload.story_id
      const response = yield call(getDataApi, url, payload.access_token)
      if (response.status === 200) {
          yield put(actions.successStory({ "data": response.data }))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* getStories(action) {
    try{
      let payload = action.payload
      let url = "stories"
      const response = yield call(getDataApi, url, payload.access_token)
      if (response.status === 200) {
          yield put(actions.getStoriesSuccess({ "listing": response.data }))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export default function* editSagas(){
    yield takeEvery(actions.saveStory, saveStory)
    yield takeEvery(actions.getStory, getStory)
    yield takeEvery(actions.getStories, getStories)
}
