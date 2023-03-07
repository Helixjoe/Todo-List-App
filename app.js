const express = require("express");
const app = express();
//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let today = new Date();
  let currentDay = today.getDay();
  let day = "";
  if (currentDay === 1) {
    day = "Monday";
  } else if (currentDay === 2) {
    day = "Tuesday";
  } else if (currentDay === 3) {
    day = "Wednesday";
  } else if (currentDay === 4) {
    day = "Thursday";
  } else if (currentDay === 5) {
    day = "Friday";
  } else if (currentDay === 6) {
    day = "Saturday";
  } else if (currentDay === 0) {
    day = "Sunday";
  }
  res.render("list", { kindOfDay: day });
});
app.listen(3000, function () {
  console.log("Server started at port 3000");
});
