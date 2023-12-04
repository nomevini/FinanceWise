const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(4).toString('hex');
}

module.exports = generateToken;