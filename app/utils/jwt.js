const jwt = require("jsonwebtoken");

// Fucntion to generate a token
const generateToken = (email, uid, applicationId, vaidity) => {
  /**
   * Fuction to generate jwt tokens
   * @param {String} email - user email
   * @param {String} uid - user id
   * @param {String} applicationId - application id
   * @param {String} vaidity - token validity
   * @returns {String} token - jwt token
   *
   */

  if (vaidity !== "infinite") {
    return jwt.sign(
      {
        email,
        uid,
        applicationId,
        generatedAt: Date.now().toISOString(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: vaidity,
      }
    );
  } else {
    return jwt.sign(
      {
        email,
        uid,
        applicationId,
        generatedAt: Date.now().toISOString(),
      },
      process.env.JWT_SECRET
    );
  }
};
