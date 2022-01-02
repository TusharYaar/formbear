const express = require("express");
const router = express.Router();
const cors = require("cors");
const { devCorsOptions } = require("../utils/cors");

const { checkDevEnv } = require("../middlewares/devMiddleware");

const { userDb } = require("../database");

// Enable CORS
router.use(cors(devCorsOptions));

router.get("/admin/all-users", checkDevEnv, async (req, res) => {
  const allUsers = await userDb.fetch();
  res.send(allUsers);
});

module.exports = router;
