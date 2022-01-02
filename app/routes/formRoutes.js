const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middlewares/authMiddleware");
const { getForms } = require("../utils/form");
const cors = require("cors");
// Enable CORS
router.use(cors());

router.all("/submit", function (req, res) {
  console.log("submit");
  res.send("submit");
});

router.get("/", verifyUser, async (req, res) => {
  const { email } = req.user;
  const forms = await getForms(email);
  res.send(forms);
});

router.get("/:id", verifyUser, async (req, res) => {});

router.delete("/:id", verifyUser, async (req, res) => {});

module.exports = router;
