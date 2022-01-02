const express = require("express");
const router = express.Router();
const cors = require("cors");
const { appCorsOptions } = require("../utils/cors");

const { userDb } = require("../database");

// Enable CORS
router.use(cors(appCorsOptions));

const { verifyUser, checkAdmin } = require("../middlewares/authMiddleware");

router.get("/all-users", verifyUser, checkAdmin, (req, res) => {
  const allUsers = userDb.fetch();
  res.send(allUsers);
});

module.exports = router;
