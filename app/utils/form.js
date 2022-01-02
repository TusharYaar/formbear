const { formDb } = require("../database");

const getForms = async (email) => {
  const userForms = await formDb.fetch({ email: email });
  return userForms;
};

module.exports = { getForms };
