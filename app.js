const express = require("express");
const date = require(__dirname + "/date.js");

const app = express();
//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
const itemList = ["Buy groceries", "Go to the Gym", "Sleep early"];
const workItemsList = ["Finish the feature"];

app.get("/", (req,res) => {
  const day = date.getDay();
  res.render("list", { kindOfDay: day, newTasks: itemList });
});

app.post("/", (req, res)=> {
  const newItem = req.body.textBox;
  if(req.body.submit === "work")
  {
    workItemsList.push(newItem);
    res.redirect("/work");
  }
  else
  {
    itemList.push(newItem);
    res.redirect("/");
  }

});

app.get("/work", (req,res)=>{
  res.render("list", { kindOfDay: "Work", newTasks: workItemsList});
})

app.get("/about", (req,res)=>{
  res.render("about");
})
app.listen(3000, function () {
  console.log("Server started at port 3000");
});
