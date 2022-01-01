const { auth } = require("../firebase");

const verifyUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({
        message: "You must be logged in to access this content",
      });
    }
    const token = authorization.split(" ")[1];
    const response = await auth.verifyIdToken(token);
    console.log(response);
    res.send({ message: "Verified User" });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: "You must be logged in to access this content",
    });
  }
};

module.exports = { verifyUser };
