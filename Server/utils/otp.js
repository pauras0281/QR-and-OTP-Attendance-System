const speakeasy = require('speakeasy');

// Generate a new secret key
const secret = speakeasy.generateSecret({ length: 5 });

// Generate OTP based on the secret key
const otp = speakeasy.totp({
  secret: secret.base32,
  encoding: 'base32'
});

console.log('OTP:', otp);
