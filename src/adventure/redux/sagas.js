import * as actions from 'redux/actions'
import { fork, put, call, takeEvery } from 'redux-saga/effects'
import { getDataApi, postDataApi, deleteDataApi } from 'redux/api'
import { push } from 'react-router-redux'
import { wsHandling } from './sockets'

export function* saveStory(action) {
    try{
      let payload = action.payload
      let url = ""
      if (payload.story.id){
          url = "editor/" + payload.story.id
      }else{
          url = "editor"
      }
      const response = yield call(postDataApi, url, payload.story, payload.access_token)
      if (response.status === 200) {
          if (payload.notification) {
              yield put(actions.success({ message: "Save Complete" }))
          }
          if (response.data.story){
              yield put(actions.getStorySuccess({ story: response.data.story }))
              if (payload.redirect){
                  yield put(push("/story/edit/" + response.data.story.slug))
              }
          }
        }else{
          yield put(actions.error({ message: response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ message: error.message }))
      }
}

export function* getStory(action) {
    try{
      let payload = action.payload
      let url = ""
      if (payload.edit){
          url = "editor/" + payload.story_id
      }else{
          url = "play/stories/" + payload.story_id
      }
      const response = yield call(getDataApi, url, payload.access_token)
      if (response.status === 200) {
          if (response.data.story){
              yield put(actions.getStorySuccess({ story: response.data.story }))
              if (payload.redirect){
                  yield put(push("/story/edit/" + response.data.story.id))
              }
          }
        }else{
          yield put(actions.error({ message: response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ message: error.message }))
      }
}

export function* getStories(action) {
    try{
      let payload = action.payload
      let url = ""
      if (payload.edit){
          url = "editor"
      }else{
          url = "play/stories"
      }
      const response = yield call(getDataApi, url, payload.access_token)
      if (response.status === 200) {
          yield put(actions.getStoriesSuccess({ "listing": response.data.listing }))
        }else{
          yield put(actions.error({ message: response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ message: error.message }))
      }
}

export function* getTools(action) {
    try{
      let payload = action.payload
      let url = "editor/tools"
      const response = yield call(getDataApi, url, payload.access_token)
      if (response.status === 200) {
          yield put(actions.getToolsSuccess({ "commands": response.data.commands }))
        }else{
          yield put(actions.error({ message: response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ message: error.message }))
      }
}

function* deleteStory(action) {
    try{
      let payload = action.payload
      let url = "editor/" + payload.story_id
      const response = yield call(deleteDataApi, url, payload.access_token);
      if (response.status === 200) {
          yield put(actions.success({ message: response.data.slug + " deleted" }))
          yield put(actions.getStories({ access_token: payload.access_token }))
      }else{
          yield put(actions.error({ message: response.data.description || response.data.error }))
      }
  }catch(error){
        yield put(actions.error({ message: error.message }))
    }
}

export function* getSessions(action) {
    try{
      let payload = action.payload
      let url = "play/sessions"
      const response = yield call(getDataApi, url, payload.access_token)
      if (response.status === 200) {
          yield put(actions.getSessionsSuccess({ listing: response.data.listing }))
        }else{
          yield put(actions.error({ message: response.data.description || response.data.error }))
        }
      }catch(error){
        yield put(actions.error({ message: error.message }))
      }
}

export default function* editSagas(){
    yield fork(wsHandling)
    //Getters
    yield takeEvery(actions.getStory, getStory)
    yield takeEvery(actions.getStories, getStories)
    //Editor
    yield takeEvery(actions.saveStory, saveStory)
    yield takeEvery(actions.deleteStory, deleteStory)
    yield takeEvery(actions.getTools, getTools)
    //Play
    yield takeEvery(actions.getSessions, getSessions)
}
