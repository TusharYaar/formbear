const admin = require("firebase-admin");

const serviceAccount = require("./firebase_admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const messaging = admin.messaging();
module.exports = { admin, auth, messaging };
