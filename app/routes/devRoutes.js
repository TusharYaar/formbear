const express = require("express");
const router = express.Router();

const { checkDevEnv } = require("../middlewares/devMiddleware");

const { userDb } = require("../database");

router.get("/admin/all-users", checkDevEnv, async (req, res) => {
  const allUsers = await userDb.fetch();
  res.send(allUsers);
});

module.exports = router;
