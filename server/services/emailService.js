const nodemailer = require("nodemailer");

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"AI Study App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "OTP Verification",
    html: `
      <h2>Your OTP Code</h2>
      <p><b>${otp}</b></p>
      <p>This code will expire in 5 minutes.</p>
    `,
  });
};

module.exports = {sendOTPEmail};