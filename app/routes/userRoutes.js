const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middlewares/authMiddleware");
const { getForms } = require("../utils/form");

const { userDb } = require("../database");

router.get("/profile", verifyUser, async (req, res) => {
  const { uid, is_disabled, email_verified, email, mobile_devices } = req.user;
  const forms = await getForms(email);
  console.log(forms);
  res.send({ uid, is_disabled, email_verified, email, mobile_devices, forms });
});

router.get("/forms", verifyUser, async (req, res) => {
  const { email } = req.user;
  const forms = await getForms(email);
  res.send(forms);
});

router.put("/update-user", verifyUser, async (req, res) => {
  const { uid } = req.user;
  const { email, is_disabled, email_verified, mobile_devices } = req.body;
  const user = await userDb.update({ email, is_disabled, email_verified, mobile_devices }, uid);
  res.send(user);
});

module.exports = router;
