const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// app.get("/", (req, res) => {
//   res.render("index.html");
// });

//do something when a client connects to the server
io.on('connection', socket => {
  console.log('New user connected');

  // socket.emit("newEmail", {
  //   from: "me@me.com",
  //   text: "hey, how're you",
  //   createdAt: 123
  // });

  // socket.emit("newMessage", {
  //   from: "admin",
  //   text: "the test message for chat app",
  //   createdAt: new Date().getTime()
  // });

  // socket.on("createEmail", newEmail => {
  //   console.log("createEmail", newEmail);
  // });

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('name and roomname are required');
    }

    socket.join(params.room);

    socket.emit(
      'newMessage',
      generateMessage('admin', 'welcome to the chat app')
    );

    socket.broadcast
      .to(params.room)
      .emit(
        'newMessage',
        generateMessage('admin', `${params.name} has joined ${params.room}`)
      );

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    //this broadcasts to every connection
    io.emit('newMessage', generateMessage(message.from, message.text));

    // callback for acknowledgements as written in index.js
    callback('callback string from server.js');

    // broadcast.emit will send to everyone except for this socket
    // socket.broadcast.emit(
    //   "newMessage",
    //   generateMessage(message.from, message.text)
    // );
  });

  socket.on('createLocationMessage', coords => {
    io.emit(
      'newLocationMessage',
      generateLocationMessage('admin', coords.latitude, coords.longitude)
    );
  });

  socket.on('disconnect', socket => {
    console.log('Client has disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
