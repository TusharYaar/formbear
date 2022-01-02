const express = require("express");
const router = express.Router();
const cors = require("cors");

const { devCorsOptions } = require("../utils/cors");
const { generateToken } = require("../utils/token");

const { checkDevEnv, addUserData } = require("../middlewares/devMiddleware");

const { userDb, tokenDb, formDb } = require("../database");

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

router.post("/create-token", checkDevEnv, addUserData, async (req, res) => {
  try {
    const { uid, email } = req.user;
    const { expiry_duration } = req.body;
    const token = generateToken();
    const application = await tokenDb.put({
      uid,
      email,
      token,
      expiry_duration,
    });
    res.send({ application });
  } catch (err) {
    console.log(err);
    res.send({ error: err });
  }
});
