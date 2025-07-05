const qrcode = require('qrcode');

// Generate QR code based on the OTP secret key
qrcode.toDataURL(secret.otpauth_url, (err, url) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('QR Code URL:', url);
});
