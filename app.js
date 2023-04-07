const express = require("express");
const app = express();
//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
let itemList = ["Buy groceries", "Go to the Gym", "Sleep early"];
let workItemsList = ["Finish the feature"];
app.get("/", (req,res) => {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);
  res.render("list", { kindOfDay: day, newTasks: itemList });
});

app.post("/", (req, res)=> {
  let newItem = req.body.textBox;
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
  

  // workItemsList.push(newItem);
  // res.redirect("/work");
});

app.get("/work", (req,res)=>{
  res.render("list", { kindOfDay: "Work", newTasks: workItemsList});
})

app.listen(3000, function () {
  console.log("Server started at port 3000");
});
