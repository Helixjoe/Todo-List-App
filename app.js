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
  switch (currentDay) {
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    case 0:
      day = "Sunday";
      break;
    default:
  }

  res.render("list", { kindOfDay: day });
});
app.listen(3000, function () {
  console.log("Server started at port 3000");
});
