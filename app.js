const express = require("express");
const app = express();
//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
let itemList = ["Buy groceries", "Go to the Gym", "Sleep early"];
app.get("/", function (req, res) {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);
  res.render("list", { kindOfDay: day, newTasks: itemList });
});

app.post("/", function (req, res) {
  let newItem = req.body.textBox;
  itemList.push(newItem);
  res.redirect("/");
});
app.listen(3000, function () {
  console.log("Server started at port 3000");
});
