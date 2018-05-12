var socket = io();

socket.on("connect", function() {
  console.log("Connected to server");

  // socket.emit("createEmail", {
  //   to: "you@you.com",
  //   text: "hey this is me"
  // });

  // socket.emit("createMessage", {
  //   from: "client-bill",
  //   text: "message back to the server from bill"
  // });
});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newEmail", function(email) {
  console.log("new email!", email);
});

socket.on("newMessage", function(message) {
  console.log("new message: ", message);
});
