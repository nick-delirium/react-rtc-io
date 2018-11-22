import { takeEvery, all } from 'redux-saga/effects'

const handleNewMessage = function* handleNewMessage(params) {
  yield all([
    takeEvery("ADD_MESSAGE", (action) => {
      const msg = {
        room: action.path,
        message: action.message,
        author: action.author
      }
      console.log(action)
      params.socket.emit("msg", msg)
    }),
    takeEvery("APPLY_USER", ({obj}) => {
      const path = window.location.pathname;
      const { userName, roomId } = obj;
      console.log("HELLO",obj); 
      if (path === "/") {
        const msg = {
          roomId: roomId,
          userName: userName
        }
        console.log(msg, "2nd step")
        params.socket.emit("newroom", msg)
      } else {
        const room = path.slice(1);
        console.log(room)
        const msg = {
          roomId: room,
          userName: userName
        }
        params.socket.emit("joinroom", msg)
      }
    })
  ])
}



export default handleNewMessage