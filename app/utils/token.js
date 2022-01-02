const { customAlphabet } = require("nanoid");
const { alphanumeric } = require("nanoid-dictionary");

// Fucntion to generate a token
const generateToken = () => {
  /**
   * Fuction to generate tokens
   * @returns {String} token - token
   */
  const generatorFunction = customAlphabet(alphanumeric, 15);
  const token = generatorFunction();
  return token;
};

module.exports = { generateToken };
