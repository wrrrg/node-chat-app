const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");
var app = express();

app.use(express.static(publicPath));

// app.get("/", (req, res) => {
//   res.render("index.html");
// });

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
