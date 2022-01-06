const { auth } = require("../firebase");
const { userDb, tokenDb } = require("../database");

const getUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id.length !== 12) return res.status(400).send({ error: "Invalid id! Please enter a valid id." });
    const { items } = await userDb.fetch({ submit_id: id });

    if (items.length !== 1) {
      return res.status(404).send({
        error: "User not found",
      });
    }
    req.user = items[0];
    next();
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = { getUserProfile };
