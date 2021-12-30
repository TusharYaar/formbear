"use strict";
require("dotenv").config();

const express = require("express");
const firebaseApp = require("./firebase");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

if (!process.env.DETA_RUNTIME) {
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
}

module.exports = app;
