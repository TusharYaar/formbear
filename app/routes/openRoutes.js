const express = require("express");
const router = express.Router();

const { verifyUserApiToken } = require("../middlewares/authMiddleware");
const { getForm, getAllForms } = require("../utils/form");

const { formDb } = require("../database");

const cors = require("cors");

// Enable CORS
router.use(cors());
// Enable api token verification
router.use(verifyUserApiToken);

router.get("/", async (req, res) => {
  console.log("called");
  try {
    const { email } = req.user;
    const forms = await getAllForms(email);
    res.send(forms);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
});

router.get("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  try {
    const { email } = req.user;
    const { allow_delete } = req.token;

    if (!allow_delete) {
      return res.status(403).send({
        error: "You are not authorized to delete this form",
      });
    }

    const { id } = req.params;
    const form = await getForm(email, id);

    if (form) {
      await formDb.delete(id);
    }
    res.status(200).send({ message: "Form deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
