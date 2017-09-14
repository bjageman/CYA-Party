// import myConfig from 'config.js';
// var url = myConfig.API_URL

// function connect() {
//   const socket = io(url);
//   return new Promise(resolve => {
//     socket.on('connect', () => {
//       resolve(socket);
//     });
//   });
// }
//
// //Handle anything the server returns
// function subscribe(socket) {
//   try{
//     return eventChannel(emit => {
//       socket.on('user_login_success', ({ user }) => {
//         //emit(loginSuccess({ user }));
//       });
//       socket.on('disconnect', e => {
//         // TODO: handle
//       });
//       return () => {};
//     });
//   }catch(err){
//     console.log("reading ERROR: " + err.message)
//   }
// }
//
// function* readSockets(socket) {
//   try{
//     const channel = yield call(subscribe, socket);
//     while (true) {
//       let action = yield take(channel);
//       yield put(action);
//     }
//   }catch(err){
//     console.log("readSockets ERROR: " + err.message)
//   }
//
// }
//
// function* handleIO(socket) {
//   try{
//     yield fork(readSockets, socket);
//     yield fork(loginWebSocket, socket);
//   }catch(err){
//     console.log("readSockets ERROR: " + err.message)
//   }
// }

// function* flow() {
//   while (true) {
//     const socket = yield call(connect);
//     const task = yield fork(handleIO, socket);
//     let action = yield take(`${actions.logout}`);
//     yield cancel(task);
//     socket.emit('logout');
//   }
// }

// function* loginWebSocket(socket) {
//   while (true) {
//     const { payload } = yield take(`${actions.login}`);
//     console.log("PAYLOAD:",payload)
//     socket.emit('login', { username: payload.username, password: payload.password });
//   }
// }
