const express = require("express");
//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const app = express();

app.get("/", function (req, res) {
  req.send("hello");
});
app.listen(3000, function () {
  console.log("Server started at port 3000");
});
