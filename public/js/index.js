var socket = io();

socket.on("connect", function() {
  console.log("Connected to server");
});

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
  console.log("newMessage", message);

  var li = $("<li></li>");
  li.text(`${message.from}: ${message.text}`);

  $("#messages").append(li);
});

socket.on("newLocationMessage", function(message) {
  var li = $("<li></li>");
  var a = $("<a target='_blank'>My Location</a>");

  li.text(`${message.from}: `);
  a.attr("href", message.url);
  li.append(a);
  $("#messages").append(li);
});

var messageText = $("[name=message]");

$("#send-message").on("submit", function(e) {
  e.preventDefault();

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: messageText.val()
    },
    function() {
      messageText.val("");
    }
  );
});

var locationButton = $("#send-location");

locationButton.on("click", function() {
  locationButton.html("Sending Location");

  if (!navigator.geolocation) {
    return alert("geolocation not supported");
  } else {
    locationButton.attr("disabled", "disabled");
    navigator.geolocation.getCurrentPosition(
      function(position) {
        socket.emit("createLocationMessage", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        locationButton.html("Location Sent");

        var enableLocationButton = function() {
          locationButton.removeAttr("disabled");
          locationButton.html("Send Location");
        };

        setTimeout(enableLocationButton, 1000);
      },
      function() {
        alert("unable to fetch location");

        var enableLocationButton = function() {
          locationButton.removeAttr("disabled");
          locationButton.html("Send Location");
        };

        setTimeout(enableLocationButton, 1000);
      }
    );
  }
});
