const express = require("express");
const router = express.Router();

const { getUserProfile } = require("../middlewares/formMiddleware");
const { notifyUserForForm } = require("../utils/form");

const { sendNewFormEmail } = require("../mail");

const { formDb } = require("../database");

const cors = require("cors");

// Enable CORS
router.use(cors());

router.all("/submit/:id", getUserProfile, async function (req, res) {
  try {
    const { body } = req;

    const { _redirect, _webhook, _cc } = body;

    _redirect ? delete body._redirect : null;
    _webhook ? delete body._webhook : null;
    _cc ? delete body._cc : null;

    if (typeof _cc === "string") _cc = _cc.split(",");

    await formDb.put({
      form_response: body,
      uid: req.user.uid,
      email: req.user.email,
      star: false,
      form_viewed: false,
      created_at: new Date().toISOString(),
    });

    if (_redirect) {
      res.redirect(_redirect);
    } else {
      res.status(200).send({ message: "Form submitted successfully" });
    }
    notifyUserForForm(req.user.mobile_devices);
    sendNewFormEmail(req.user.email, _cc, body);
  } catch (error) {
    res.status(500).send({ error: error.message });
    notifyUserForForm(
      req.user.mobile_devices,
      "Error",
      `A attempt to submission was made but failed. Error Message: ${error.message}`
    );
  }
});
module.exports = router;
