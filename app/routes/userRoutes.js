const express = require("express");
const router = express.Router();
const cors = require("cors");
const { appCorsOptions } = require("../utils/cors");

const { verifyUser } = require("../middlewares/authMiddleware");
const { getAllForms, getForm } = require("../utils/form");
const { generateToken } = require("../utils/token");

const { tokenDb, formDb, userDb } = require("../database");

// Enable CORS
router.use(cors(appCorsOptions));

router.use(verifyUser);

router.get("/profile", async (req, res) => {
  const { uid, is_disabled, email_verified, email, mobile_devices, submit_id } = req.user;
  const forms = await getAllForms(email);
  res.send({ uid, is_disabled, email_verified, email, mobile_devices, forms, submit_id });
});

router.delete("/profile", async (req, res) => {
  console.log(req.user.uid);
  const forms = await getAllForms(email);
  if (forms && forms.length > 0) {
    forms.forEach(async (form) => {
      await formDb.delete(form.id);
    });
  }
  // await tokenDb.delete(req.user.uid);
  await userDb.delete(req.user.uid);
  res.status(200).send({ message: "User deleted successfully" });
});

router.post("/mobile", async (req, res) => {
  const { uid, mobile_devices } = req.user;
  const { device_name = "", device_id = "", manufacturer = "", message_token = "" } = req.body;
  if (!device_name || !device_id || !manufacturer || !message_token) {
    return res.status(400).send({ error: "Incomplete Details" });
  }
  const device_exist = mobile_devices.findIndex((device) => device.device_id === device_id);
  if (device_exist === -1) {
    mobile_devices.push({
      device_name,
      device_id,
      manufacturer,
      message_token,
    });
  } else {
    mobile_devices[device_exist].message_token = message_token;
  }
  await userDb.update(
    {
      last_updated_at: new Date().toISOString(),
      mobile_devices,
    },
    uid
  );
  res.status(200).send({ success: true });
});

router.get("/tokens", async (req, res) => {
  const { uid } = req.user;
  const tokens = await tokenDb.fetch({ uid });
  res.send(tokens);
});

router.delete("/tokens/:id", async (req, res) => {
  const { uid } = req.user;
  const { id } = req.params;
  const token = await tokenDb.get(id);
  if (!token || token.uid !== uid) {
    return res.status(400).send({ error: "Token not found" });
  }
  await tokenDb.delete(id);
  res.status(200).send({ success: true });
});

router.post("/create-token", async (req, res) => {
  try {
    const { uid, email } = req.user;
    const { expiry_duration = 7, allow_delete = false } = req.body;
    console.log(expiry_duration);
    if ((expiry_duration !== -1 && expiry_duration < 7) || typeof expiry_duration !== "number") {
      throw new Error("Invalid expiry duration");
    }
    console.log(expiry_duration);
    const token = generateToken();
    const application = await tokenDb.put({
      uid,
      email,
      token,
      expiry_duration,
      created_at: new Date().toISOString(),
      allow_delete,
    });
    console.log(application);
    res.send(application);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

router.get("/user-forms", async (req, res) => {
  try {
    const { email } = req.user;
    const forms = await getAllForms(email);
    res.send(forms);
  } catch (err) {
    console.log(err);
    res.send({ error: err.message });
  }
});

router.delete("/user-forms/:id", async (req, res) => {
  try {
    const { email } = req.user;
    const { id } = req.params;
    const form = await getForm(email, id);
    if (form) {
      await formDb.delete(id);
      res.send({ success: true });
    } else {
      res.send({ error: "Form not found" });
    }
  } catch (err) {
    console.log(err);
    res.send({ error: err.message });
  }
});

router.get("/user-forms/:id/star", async (req, res) => {
  try {
    const { email } = req.user;
    const { id } = req.params;
    const form = await getForm(email, id);
    if (form) {
      await formDb.update({ star: !form.star }, id);
      res.send({ success: true });
    } else {
      res.send({ error: "Form not found" });
    }
  } catch (err) {
    console.log(err);
    res.send({ error: err.message });
  }
});

router.get("/user-forms/:id/mark-read", async (req, res) => {
  try {
    const { email } = req.user;
    const { id } = req.params;
    const form = await getForm(email, id);
    if (form) {
      await formDb.update({ form_viewed: true }, id);
      res.send({ success: true });
    } else {
      res.send({ error: "Form not found" });
    }
  } catch (err) {
    console.log(err);
    res.send({ error: err.message });
  }
});

module.exports = router;
