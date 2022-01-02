const express = require("express");
const router = express.Router();

const { userDb } = require("../database");

const { verifyUser, checkAdmin } = require("../middlewares/authMiddleware");

router.get("/all-users", verifyUser, checkAdmin, (req, res) => {
  const allUsers = userDb.fetch();
  res.send(allUsers);
});

module.exports = router;
