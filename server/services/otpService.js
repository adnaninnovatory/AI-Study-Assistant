const crypto = require("crypto")
const Otp = require("../models/Otp")

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const saveOTP = async (email, otp) => {
  await Otp.deleteMany({ email });

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); //After 5 minutes

  return await Otp.create({ email, otp, expiresAt });
};

const verifyOTP = async (email, otp) => {
  const record = await Otp.findOne({ email, otp });

  if (!record) return false;

  if (record.expiresAt < new Date()) return false;

  await Otp.deleteMany({ email }); // cleanup

  return true;
};

module.exports = {
    generateOTP,
    saveOTP,
    verifyOTP,
}