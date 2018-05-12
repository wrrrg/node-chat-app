const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// app.get("/", (req, res) => {
//   res.render("index.html");
// });

//do something when a client connects to the server
io.on("connection", socket => {
  console.log("New user connected");

  socket.emit("newMessage", {
    from: "admin",
    text: "welcome to the chat app",
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "new user has joined chat",
    createdAt: new Date().getTime()
  });

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

  socket.on("createMessage", newMessage => {
    console.log("new message: ", newMessage);

    //this broadcasts to every connection
    // io.emit("newMessage", {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });

    // broadcast.emit will send to everyone except for this socket
    socket.broadcast.emit("newMessage", {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on("disconnect", socket => {
    console.log("Client has disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
