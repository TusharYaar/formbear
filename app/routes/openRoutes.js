const express = require("express");
const router = express.Router();

const { verifyUserApiToken } = require("../middlewares/authMiddleware");
const { getUserProfile } = require("../middlewares/formMiddleware");
const { getForm, getAllForms, notifyUserForForm } = require("../utils/form");

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

    if (!Array.isArray(_cc)) _cc = _cc.split(",");

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
      res.status(200).send("Form submitted successfully");
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

router.get("/", verifyUserApiToken, async (req, res) => {
  try {
    const { email } = req.user;
    const forms = await getAllForms(email);
    res.send(forms);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
});

router.get("/:id", verifyUserApiToken, async (req, res) => {
  try {
    const { email } = req.user;
    const { id } = req.params;
    const form = await getForm(email, id);
    res.send(form);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
});

router.delete("/:id", verifyUserApiToken, async (req, res) => {
  try {
    const { email } = req.user;
    const { id } = req.params;
    const form = await getForm(email, id);
    // if (form) {
    //   await formDb.delete(id);
    // }
    res.send(form);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
});

module.exports = router;
