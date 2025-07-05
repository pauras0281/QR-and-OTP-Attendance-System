const otpGenerator = require('otp-generator');

function generateOTP() {
  // Generate a 6-digit numeric OTP
  return otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
}

module.exports = generateOTP;