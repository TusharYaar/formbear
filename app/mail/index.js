const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtppro.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendNewFormEmail = async (email, cc, body) => {
  const mailOptions = {
    from: process.env.USEREMAIL,
    to: email,
    cc,
    subject: "New Form Submitted",
    text: "New form submitted",
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { sendNewFormEmail };
