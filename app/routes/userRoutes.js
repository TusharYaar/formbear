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
  const { uid, is_disabled, email_verified, email, mobile_devices } = req.user;
  const forms = await getAllForms(email);
  res.send({ uid, is_disabled, email_verified, email, mobile_devices, forms });
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
    });
    res.send({ application });
  } catch (err) {
    console.log(err);
    res.send({ error: err.message });
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

module.exports = router;
