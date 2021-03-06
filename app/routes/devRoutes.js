const express = require("express");
const router = express.Router();
const cors = require("cors");

const { devCorsOptions } = require("../utils/cors");
const { generateToken } = require("../utils/token");

const { checkDevEnv, addUserData } = require("../middlewares/devMiddleware");
const { notifyUserForForm } = require("../utils/form");

const { userDb, tokenDb, formDb } = require("../database");
// const { route } = require("./userRoutes");

// Enable CORS
router.use(cors(devCorsOptions));

router.get("/admin/all-users", checkDevEnv, async (req, res) => {
  const allUsers = await userDb.fetch();
  res.send(allUsers);
});

module.exports = router;

router.get("/generate-jwt", checkDevEnv, addUserData, async (req, res) => {
  const jwt = generateToken();
  console.log(jwt);
  res.send(jwt);
});

router.get("/send-notification", checkDevEnv, addUserData, async (req, res) => {
  try {
    await notifyUserForForm(req.user.mobile_devices, "helo");
    res.send({ success: true });
  } catch (err) {
    console.log(err);
    res.send({ error: err.message });
  }
});
