import openSocket from 'socket.io-client';
import { messageReceived } from './store/actions/messages.js';
// import { addUser } from './store/actions/addUser.js';
import { removeUser } from './store/actions/removeUser.js';
import { updateUsers } from './store/actions/updateUsers.js';
import { setPath } from './store/actions/setPath.js';

const setupSocket = dispatch => {
  const socket = openSocket('http://localhost:8085');

  socket.on('message', msg => {
    dispatch(messageReceived(msg.message, msg.author));
  });
  socket.on('getnewuser', name => {
    // dispatch(addUser(name));
    dispatch(messageReceived(`USER ${name} HAVE JOINED`, 'system'));
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
    dispatch(messageReceived(`USER ${name} HAVE LEFT`, 'system'));
  });

  return socket;
};

export default setupSocket;
