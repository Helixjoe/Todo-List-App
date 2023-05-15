const express = require("express");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();
//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", { useNewUrlParser: true });

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to the todolist app"
});

const item2 = new Item({
  name: "Hit the + button to add tasks"
});

const item3 = new Item({
  name: "<-- Hit this button to delete task"
});

const defaultItems = [item1, item2, item3];

app.get("/", (req, res) => {
  async function run() {
    const foundItems = await Item.find();
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems)
        .then(function () {
          console.log("Successfully saved defult items to DB");
        })
        .catch(function (err) {
          console.log(err);
        });
      res.render("list", { kindOfDay: "Today", newTasks: defaultItems });
    }
    else {
      res.render("list", { kindOfDay: "Today", newTasks: foundItems });
    }
  }
  run();
});

app.post("/", (req, res) => {
  const itemName = req.body.textBox;
  const item = new Item({
    name: itemName
  })
  item.save();
  res.redirect("/");


});

app.get("/work", (req, res) => {
  res.render("list", { kindOfDay: "Work", newTasks: workItemsList });
})

app.get("/about", (req, res) => {
  res.render("about");
})
app.listen(3000, function () {
  console.log("Server started at port 3000");
});
