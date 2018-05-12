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

  socket.on("disconnect", socket => {
    console.log("Client has disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
