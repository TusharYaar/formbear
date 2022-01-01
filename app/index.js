"use strict";
require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
var cors = require("cors");

app.use(cors());

app.use(express.static(path.join(__dirname, "build")));

app.use("/api", require("./routes/userRoutes"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

if (!process.env.DETA_RUNTIME) {
  app.listen(5000, () => {
    console.log("Server started on port 5000");
  });
}

module.exports = app;
