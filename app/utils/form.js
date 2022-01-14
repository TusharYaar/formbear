const { formDb } = require("../database");

const { messaging } = require("../firebase");

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

const notifyUserForForm = async (userDevices, title, body) => {
  if (userDevices.length === 0) return;
  try {
    const message = {
      notification: {
        title: title || "New Form Submitted",
        body: body || "You have a new form submitted, visit the app or website to see it.",
      },
      tokens: userDevices.map((device) => device.message_token),
    };
    await messaging.sendMulticast(message);
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllForms, getForm, notifyUserForForm };
