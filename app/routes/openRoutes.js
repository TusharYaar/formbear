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
    await formDb.put({
      form_response: body,
      uid: req.user.uid,
      email: req.user.email,
      star: false,
      form_viewed: false,
      created_at: new Date().toISOString(),
    });
    res.send({ success: true });
    notifyUserForForm(req.user.mobile_devices);
    sendNewFormEmail(req.user.email, body);
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
