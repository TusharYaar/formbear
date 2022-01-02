"use strict";
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

// Set Static Path
app.use(express.static(path.join(__dirname, "build")));

// Import Routes
if (!process.env.DETA_RUNTIME) {
  app.use("/api", require("./routes/devRoutes"));
}

app.use("/api", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/forms", require("./routes/formRoutes"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

if (!process.env.DETA_RUNTIME) {
  app.listen(5000, () => {
    console.log("Server started on port 5000");
  });
}

module.exports = app;
