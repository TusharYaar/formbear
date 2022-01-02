const express = require("express");
const router = express.Router();
const cors = require("cors");
const { appCorsOptions } = require("../utils/cors");

const { verifyUser } = require("../middlewares/authMiddleware");
const { getForms } = require("../utils/form");

const { userDb } = require("../database");

// Enable CORS
router.use(cors(appCorsOptions));

router.get("/profile", verifyUser, async (req, res) => {
  const { uid, is_disabled, email_verified, email, mobile_devices } = req.user;
  const forms = await getForms(email);
  res.send({ uid, is_disabled, email_verified, email, mobile_devices, forms });
});

router.get("/forms", verifyUser, async (req, res) => {
  const { email } = req.user;
  const forms = await getForms(email);
  res.send(forms);
});

module.exports = router;
