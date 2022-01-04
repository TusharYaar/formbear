const { auth } = require("../firebase");
const { userDb, tokenDb } = require("../database");

const getUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userDb.get(id);
    if (!user) {
      return res.status(404).send({
        error: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = { getUserProfile };
