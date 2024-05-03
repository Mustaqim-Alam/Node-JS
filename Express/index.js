 const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`Welcome to home page, ${req.query.name}`);
});
app.get("/about", (req, res) => {
  res.send("Welcome to about page!");
});

app.listen(8000, () => console.log("server listening..."));
