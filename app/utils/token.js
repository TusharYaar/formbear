const { customAlphabet } = require("nanoid");
const { alphanumeric } = require("nanoid-dictionary");

// Fucntion to generate a token
const generateToken = (length = 15) => {
  /**
   * Fuction to generate tokens
   * @returns {String} token - token
   */
  const generatorFunction = customAlphabet(alphanumeric, length);
  const token = generatorFunction();
  return token;
};

module.exports = { generateToken };
