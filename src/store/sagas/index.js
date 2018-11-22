import { takeEvery, all } from 'redux-saga/effects';
import SimpleWebRTC from 'simplewebrtc';

const handleNewMessage = function* handleNewMessage(params) {
  yield all([
    takeEvery('ADD_MESSAGE', action => {
      const msg = {
        room: action.path,
        message: action.message,
        author: action.author,
      };
      console.log(action);
      params.socket.emit('msg', msg);
    }),
    takeEvery('APPLY_USER', ({ obj }) => {
      const path = window.location.pathname;
      const { userName, roomId } = obj;
      if (path === '/') {
        const msg = {
          roomId: roomId,
          userName: userName,
        };
        params.socket.emit('newroom', msg);
      } else {
        const roomId = path.slice(1);
        const msg = {
          roomId: roomId,
          userName: userName,
        };
        params.socket.emit('joinroom', msg);
      }
      const rtcRoom = roomId || path.slice(1);
      const webrtc = new SimpleWebRTC({
        localVideoEl: 'localVideo',
        remoteVideosEl: 'remoteVideos',
        autoRequestMedia: true,
        media: { audio: true, video: true },
      });
      webrtc.on('readyToCall', function() {
        webrtc.joinRoom(`#${rtcRoom}`);
      });
    }),
  ]);
};

export default handleNewMessage;
