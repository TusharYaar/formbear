const checkDevEnv = (req, res, next) => {
  /**
   * Check if the user is a dev
   * If the user is a dev, the user will be able to access the protected routes
   * If the user is not a dev, 403 Forbidden will be returned
   *
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  // Check user type
  if (!process.env.DETA_RUNTIME) {
    next();
  } else {
    res.status(403).send({
      error: "Unauthorized",
    });
  }
};

const addUserData = (req, res, next) => {
  req.user = {
    uid: "sdvef34f3rv34f34f",
    email: "tushar@test.com",
    sign_in_provider: "password",
    email_verified: true,
    is_disabled: false,
    mobile_devices: [],
    user_type: "user",
    created_at: new Date().toISOString(),
    last_updated_at: new Date().toISOString(),
    last_login_at: new Date().toISOString(),
  };
  next();
};

module.exports = { addUserData, checkDevEnv };
