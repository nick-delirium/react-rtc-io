const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const Chat = require('./models/Chat.js');
// const User = require("./models/User.js"); // <- can be used to make user-specific actions
const Room = require('./models/Room.js');

const chat = new Chat();
let clients = [];

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

io.on('connection', socket => {
  socket.on('newroom', ({ roomId, userName }) => {
    clients = addClient(clients, userName, socket, roomId);
    socket.join(roomId);
    const room = new Room(roomId);
    // const user = new User(userName); // <- can be used to make user-specific actions
    room.addUser(userName);
    chat.addRoom(room);
    io.to(roomId).emit('getpath', roomId);
    const date = new Date();
    const when = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    io.to(roomId).emit('message', {
      message: `your room ID is ${roomId}. Share it with others so they can join!`,
      when: when,
      author: 'system',
    });
  });
  socket.on('joinroom', ({ roomId, userName }) => {
    socket.join(roomId);
    clients = addClient(clients, userName, socket, roomId);
    const room = chat.getRoom(roomId);
    if (room) {
      room.addUser(userName);
      chat.updateRoom(room);
      const users = room.getPool();
      io.to(roomId).emit('getpath', roomId);
      io.to(roomId).emit('getnewuser', userName);
      io.to(roomId).emit('allusers', users);
    }
  });
  socket.on('msg', msg => {
    io.to(msg.room).emit('message', { message: msg.message, when: msg.when, author: msg.author });
  });

  socket.on('disconnect', function() {
    const i = clients.findIndex(item => item.socket === socket);
    if (i > -1 && Boolean(clients[i].room)) {
      const roomId = clients[i].room;
      const userName = clients[i].userName;
      const room = chat.getRoom(roomId);
      room.removeUser(userName);
      if (room.getPool().length === 0) chat.removeRoom(roomId);
      else chat.updateRoom(room);

      io.to(roomId).emit('rmuser', userName);
    }
  });
});

http.listen(process.env.PORT || 8085, function() {
  console.log('listening on localhost:8085');
});

function addClient(sockets, userName, socket, room) {
  const client = {
    userName: userName,
    room: room,
    socket: socket,
  };
  const newSockets = sockets;
  newSockets.push(client);
  return newSockets;
}
