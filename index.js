const express = require("express");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();
//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://joeljohn:joeljohn1234@cluster0.qpazsri.mongodb.net/todoListDB?retryWrites=true&w=majority", { useNewUrlParser: true });

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

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("list", listSchema);

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
      res.render("list", { listName: "Today", newTasks: defaultItems });
    }
    else {
      res.render("list", { listName: "Today", newTasks: foundItems });
    }
  }
  run();
});

app.post("/", (req, res) => {
  const itemName = req.body.textBox;
  const listName = req.body.listName;
  const item = new Item({
    name: itemName
  })
  async function find() {
    const foundItem = await List.findOne({ name: listName }).exec();
    if (foundItem != null) {
      foundItem.items.push(item);
      foundItem.save();
      res.redirect("/" + listName);
    }
  }
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  }
  else {
    find();
  }
});

app.post("/delete", (req, res) => {
  const checkedBoxId = req.body.checkbox;
  const listName = req.body.listName;
  async function del() {
    if (listName === "Today") {
      await Item.findByIdAndRemove(checkedBoxId);
      res.redirect("/");
    }
    else {
      await List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedBoxId } } });
      res.redirect("/" + listName);
    }
  };
  del();

});

app.get("/work", (req, res) => {
  res.render("list", { listName: "Work", newTasks: workItemsList });
})

app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);
  async function checkIfExists() {
    const foundList = await List.findOne({ name: customListName });
    if (!foundList) {
      const list = new List({
        name: customListName,
        items: defaultItems
      })
      list.save();
      res.redirect("/" + customListName);
    }
    else {
      res.render("list", { listName: foundList.name, newTasks: foundList.items });
    }
  };
  checkIfExists();

})

app.get("/about", (req, res) => {
  res.render("about");
})

app.listen(3000, function () {
  console.log("Server started at port 3000");
});


