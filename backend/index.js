const express = require("express");
const firebaseApp = require("./firebase");
const app = express();

app.get("/", async (req, res) => {
  res.send("Hello World");
});

module.exports = app;
