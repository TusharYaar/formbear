const whitelist = ["http://localhost:3000", "https://formbear.tusharyaar.me", "https://zivbo7.deta.dev"];

const appCorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const devCorsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

exports.module = { appCorsOptions, devCorsOptions };
