const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middlewares/authMiddleware");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/profile", verifyUser, (req, res) => {
  res.send("Profile!");
});

module.exports = router;
