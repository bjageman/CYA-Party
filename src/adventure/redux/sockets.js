import * as actions from 'redux/actions'
import io from 'socket.io-client'
import { eventChannel } from 'redux-saga'
import { fork, take, put, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import myConfig from 'config.js'
var url = myConfig.API_URL

function connect() {
  const socket = io(url)
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket)
    })
  })
}

export function* wsHandling() {
  while (true) {
    yield take(actions.socketStart);
    const socket = yield call(connect)
    const channel = yield call(watchMessages, socket);
    yield fork(incomingDataHandler, channel)
    yield fork(outgoingDataHandler, socket)
    yield take(actions.socketStop)
    channel.close()
  }
}

function* incomingDataHandler(channel) {
  try{
    while (true) {
      let action = yield take(channel)
      yield put(action)
    }
  }catch(err){
    console.log("readSockets ERROR: " + err.message)
  }
}

function* outgoingDataHandler(socket) {
    try{
        yield fork(createSessionEmit, socket)
        yield fork(joinSessionEmit, socket)
        yield fork(startSessionEmit, socket)
        yield fork(voteChoiceEmit, socket)
    }catch(err){
        console.log("readSockets ERROR: " + err.message)
    }
}

function* createSessionEmit(socket) {
    while (true) {
        const { payload } = yield take(actions.createSession)
        socket.emit('create_session', payload)
    }
}

export function* joinSessionEmit(socket) {
  while (true) {
    const { payload } = yield take(actions.joinSession)
    socket.emit('join_session', payload)
  }
}

export function* startSessionEmit(socket) {
  while (true) {
    const { payload } = yield take(actions.startSession)
    socket.emit('start_session', payload)
  }
}

export function* voteChoiceEmit(socket) {
  while (true) {
    const { payload } = yield take(actions.voteChoice)
    socket.emit('vote_choice', payload)
  }
}



function watchMessages(socket) {
  return eventChannel((emit) => {
    socket.onopen = () => {
      socket.emit('connect'); // Send data to server

    }
    socket.on('create_session_success', ({ session }) => {
        emit(actions.getSessionSuccess({ session: session }))
        emit(push("/story/play/lobby"))
    })
    socket.on('join_session_success', ({ session }) => {
        emit(actions.getSessionSuccess({ session: session }))
        emit(push("/story/play/lobby"))
    })
    socket.on('start_session_success', ({ page }) => {
        emit(actions.getPageSuccess({ page: page }))
        emit(push("/story/play/game"))
    })
    socket.on('vote_choice_success', ({ choices, winner }) => {
        emit(actions.voteChoiceSuccess({ choices: choices, winner: winner }))
    })
    socket.on('go_to_page', ({ page }) => {
        emit(actions.getPageSuccess({ page: page }))
    })
    socket.on('session_deactivated', ( ) => {
        emit(push("/story/play/join"))
        alert("This game was deactivated")
    })
    return () => {
      socket.close();
    };
  });
}
