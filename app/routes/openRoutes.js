const express = require("express");
const router = express.Router();

const { verifyUserIdToken } = require("../middlewares/authMiddleware");

const { getForms } = require("../utils/form");
const cors = require("cors");

// Enable CORS
router.use(cors());

router.all("/submit", function (req, res) {
  console.log("submit");
  res.send("submit");
});

router.get("/", verifyUserIdToken, async (req, res) => {
  const { email } = req.user;
  const forms = await getForms(email);
  res.send(forms);
});

router.get("/:id", verifyUserIdToken, async (req, res) => {});

router.delete("/:id", verifyUserIdToken, async (req, res) => {});

module.exports = router;
