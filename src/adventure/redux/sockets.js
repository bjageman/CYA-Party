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
    }catch(err){
        console.log("readSockets ERROR: " + err.message)
    }
}

function* createSessionEmit(socket) {
    while (true) {
        const { payload } = yield take(actions.createSession)
        socket.emit('create_session', payload)
        console.log("WTF IS HAPPENING")
    }
}

export function* joinSessionEmit(socket) {
  while (true) {
    const { payload } = yield take(actions.joinSession)
    socket.emit('join_session', payload)
    console.log("JOIN")
  }
}

function watchMessages(socket) {
  return eventChannel((emit) => {
    socket.onopen = () => {
      socket.emit('connect'); // Send data to server

    }
    socket.on('create_session_success', ({ session }) => {
        console.log("SESSION CREATED", session.id, session.name)
        emit(actions.getSessionSuccess({ session: session }))
        emit(push("/story/play/lobby"))
    })
    socket.on('join_session_success', ({ session }) => {
        console.log("SESSION CREATED", session.id, session.name)
        emit(actions.getSessionSuccess({ session: session }))
        emit(push("/story/play/lobby"))
    })
    return () => {
      socket.close();
    };
  });
}
