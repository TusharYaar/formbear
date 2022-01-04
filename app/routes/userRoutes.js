const express = require("express");
const router = express.Router();
const cors = require("cors");
const { appCorsOptions } = require("../utils/cors");

const { verifyUser } = require("../middlewares/authMiddleware");
const { getAllForms } = require("../utils/form");
const { generateToken } = require("../utils/token");

const { tokenDb } = require("../database");

// Enable CORS
router.use(cors(appCorsOptions));

router.use(verifyUser);

router.get("/profile", async (req, res) => {
  const { uid, is_disabled, email_verified, email, mobile_devices } = req.user;
  const forms = await getAllForms(email);
  res.send({ uid, is_disabled, email_verified, email, mobile_devices, forms });
});

router.post("/create-token", async (req, res) => {
  try {
    const { uid, email } = req.user;
    const { expiry_duration = "7d", allow_delete = false } = req.body;
    const token = generateToken();
    const application = await tokenDb.put({
      uid,
      email,
      token,
      expiry_duration,
      allow_delete,
      star: false,
    });
    res.send({ application });
  } catch (err) {
    console.log(err);
    res.send({ error: err });
  }
});

router.get("/user-forms", async (req, res) => {
  const { email } = req.user;
  const forms = await getAllForms(email);
  res.send(forms);
});

module.exports = router;
