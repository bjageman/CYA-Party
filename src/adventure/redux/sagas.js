import * as actions from 'redux/actions'
import { put, call, takeEvery } from 'redux-saga/effects'
import { getDataApi, postDataApi, deleteDataApi } from 'redux/api'
import { push } from 'react-router-redux'
import { processListingURL, processSpecificItemURL } from './utils'

export function* saveItem(action) {
    try{
      let payload = action.payload
      let url = ""
      if (payload.update){
          url = processSpecificItemURL(payload.story_id, payload.page_id, payload.choice_id, payload.action_id)
      }else{
          url = processListingURL(payload.story_id, payload.page_id, payload.choice_id, payload.action_id)
      }
      const response = yield call(postDataApi, url, payload, payload.access_token)
      if (response.status === 200) {
          yield put(actions.success({ "message": "Save Complete" }))
          yield put(push("/story/edit"))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* getItem(action) {
    try{
      let payload = action.payload
      let url = processSpecificItemURL(payload.story_id, payload.page_id, payload.choice_id, payload.action_id)
      const response = yield call(getDataApi, url, payload.access_token)
      if (response.status === 200) {
          yield put(actions.successStory({ "story": response.data.story }))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* getItems(action) {
    try{
      let payload = action.payload
      console.log(payload)
      let url = processListingURL(payload.story_id, payload.page_id, payload.choice_id, payload.action_id)
      console.log(url)
      const response = yield call(getDataApi, url, payload.access_token)
      console.log(response)
      if (response.status === 200) {
          yield put(actions.getItemsSuccess({ "listing": response.data.listing }))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}

export function* deleteItem(action) {
    try{
      let payload = action.payload
      let url = processSpecificItemURL(payload.story_id, payload.page_id, payload.choice_id, payload.action_id)
      console.log(url)
      const response = yield call(deleteDataApi, url, payload.access_token);
      if (response.status === 200) {
          yield put(actions.success({ "message": response.data.message }))
          yield put(actions.getItems({ "access_token": payload.access_token }))
        }else{
          yield put(actions.error({ "message": response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ "message": error.message }))
      }
}


export default function* editSagas(){
    yield takeEvery(actions.saveItem, saveItem)
    yield takeEvery(actions.getItem, getItem)
    yield takeEvery(actions.getItems, getItems)
    yield takeEvery(actions.deleteItem, deleteItem)
}
