const { formDb } = require("../database");

const getAllForms = async (email) => {
  const userForms = await formDb.fetch({ email: email });
  return userForms;
};

const getForm = async (email, formId) => {
  const userForm = await formDb.get(formId);
  if (userForm) {
    if (userForm.email !== email) {
      throw new Error("Form not found");
    }
    return userForm;
  }
  throw new Error("Form not found");
};

module.exports = { getAllForms, getForm };
