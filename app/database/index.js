const { Deta } = require("deta"); // import Deta

let deta;
// Deta automatically initializes the app on micro
// Does not require a project key
if (process.env.DETA_RUNTIME) {
  deta = Deta();
} else {
  deta = new Deta(process.env.PROJECT_KEY);
}

const userDb = deta.Base("users");
const formDb = deta.Base("forms");

module.exports = {
  userDb,
  formDb,
};
