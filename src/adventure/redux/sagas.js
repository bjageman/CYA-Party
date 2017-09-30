import * as actions from 'redux/actions'
import { put, call, takeEvery } from 'redux-saga/effects'
import { getDataApi, postDataApi, deleteDataApi } from 'redux/api'
import { push } from 'react-router-redux'
import { processListingURL, processSpecificItemURL } from './utils'

export function* saveStory(action) {
    try{
      let payload = action.payload
      let url = "stories/" + payload.story.id
      const response = yield call(postDataApi, url, payload.story, payload.access_token)
      if (response.status === 200) {
          yield put(actions.success({ "message": "Save Complete" }))
          if (response.data.story){
              yield put(actions.getStorySuccess({ story: response.data.story }))
              if (payload.redirect){
                  yield put(push("/story/edit/" + response.data.story.id))
              }
          }
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
          if (response.data.story){
              yield put(actions.getStorySuccess({ story: response.data.story }))
              if (payload.redirect){
                  yield put(push("/story/edit/" + response.data.story.id))
              }
          }
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
      let url = processListingURL(payload.story_id, payload.page_id, payload.choice_id, payload.action_id)
      const response = yield call(getDataApi, url, payload.access_token)
      if (response.status === 200) {
          yield put(actions.getStoriesSuccess({ "listing": response.data.listing }))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* deleteStory(action) {
    try{
      let payload = action.payload
      let url = processSpecificItemURL(payload.story_id, payload.page_id, payload.choice_id, payload.action_id)
      const response = yield call(deleteDataApi, url, payload.access_token);
      if (response.status === 200) {
          yield put(actions.success({ "message": response.data.slug + " deleted" }))
          if (response.data.story){
              yield put(actions.getStorySuccess({ story: response.data.story }))
              if (payload.redirect){
                  yield put(push("/story/edit/" + response.data.story.id))
              }
          }
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
    yield takeEvery(actions.deleteStory, deleteStory)
}
