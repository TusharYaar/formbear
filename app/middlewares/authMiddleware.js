const { auth } = require("../firebase");
const { userDb, tokenDb } = require("../database");

var addDays = require("date-fns/addDays");

const { generateToken } = require("../utils/token");

const verifyUser = async (req, res, next) => {
  /**
   * Verify the user token
   * If the token is valid, the user will be able to access the protected routes
   * If the token is invalid, 401 Unauthorized will be returned
   * req.user will be set to the user object
   *
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   *
   */

  try {
    // extract the token from the request header
    const { authorization } = req.headers;

    // verify the token
    if (!authorization) {
      return res.status(401).send({
        error: "You must be logged in to access this content",
      });
    }

    const token = authorization.split(" ")[1];
    const {
      email,
      email_verified,
      uid,
      firebase: { sign_in_provider },
    } = await auth.verifyIdToken(token);
    // get the user from the database
    let user = await userDb.get(uid);
    // if the user does not exist, create it
    if (!user) {
      user = await userDb.put(
        {
          uid,
          email,
          sign_in_provider,
          submit_id: generateToken(12),
          email_verified,
          is_disabled: false,
          mobile_devices: [],
          user_type: "user",
          created_at: new Date().toISOString(),
          last_updated_at: new Date().toISOString(),
          last_login_at: new Date().toISOString(),
          max_api_keys: 3,
        },
        uid
      );
    } else {
      // update the last login time
      const new_login_at = new Date().toISOString();
      userDb.update(
        {
          last_login_at: new_login_at,
          email_verified,
        },
        uid
      );
      user.email_verified = email_verified;
    }

    // check is user is disabled
    if (user.is_disabled) {
      return res.status(403).send({
        error: "Your account has been disabled",
      });
    }

    // set the user on the request object
    req.user = user;

    // call the next middleware
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      error: "You must be logged in to access this content",
    });
  }
};

const checkAdmin = (req, res, next) => {
  /**
   * Check if the user is an admin
   * If the user is an admin, the user will be able to access the protected routes
   * If the user is not an admin, 403 Forbidden will be returned
   *
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  // Check user type
  if (req.user.user_type === "admin") {
    next();
  } else {
    res.status(403).send({
      error: "You are not authorized to access this content",
    });
  }
};

const verifyUserApiToken = async (req, res, next) => {
  /**
   *
   */
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({
        error: "Token is missing",
      });
    }
    const requestToken = authorization.split(" ")[1];
    const token = await tokenDb.get(requestToken);
    if (!token) {
      return res.status(401).send({
        error: "Token does not exist or has expired",
      });
    }

    if (token.expiry_duration !== -1 && new Date() > addDays(Date.now(), parseInt(token.expiry_duration))) {
      return res.status(401).send({
        error: "Token has expired",
      });
    }
    next();
  } catch (error) {
    return res.status(401).send({
      error: "You must be logged in to access this content",
    });
  }
};

module.exports = { verifyUser, checkAdmin, verifyUserApiToken };
