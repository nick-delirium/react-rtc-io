import openSocket from 'socket.io-client';
import { messageReceived } from './store/actions/messages.js';
import { removeUser } from './store/actions/removeUser.js';
import { updateUsers } from './store/actions/updateUsers.js';
import { setPath } from './store/actions/setPath.js';

const setupSocket = dispatch => {
  const socket = openSocket('http://localhost:8085');

  socket.on('message', msg => {
    dispatch(messageReceived(msg.message, msg.when, msg.author));
  });
  socket.on('getnewuser', name => {
    const date = new Date();
    const when = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    dispatch(messageReceived(`USER ${name} HAVE JOINED`, when, 'system'));
  });
  socket.on('getpath', path => {
    console.log(path)
    dispatch(setPath(path));
  });
  socket.on('allusers', users => {
    const currentUsers = users.map(item => {
      item = {
        name: item,
      };
      return item;
    });
    dispatch(updateUsers(currentUsers));
  });

  socket.on('rmuser', name => {
    dispatch(removeUser(name));
    const date = new Date();
    const when = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    dispatch(messageReceived(`USER ${name} HAVE LEFT`, when, 'system'));
  });

  return socket;
};

export default setupSocket;
