const qrCode = require('qrcode');

async function generateQRCode(text) {
  try {
    // Generate QR code and return the data URI
    return await qrCode.toDataURL(text);
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}


module.exports = generateQRCode;
