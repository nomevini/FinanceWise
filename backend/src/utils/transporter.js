const nodemailer = require('nodemailer');
const auth = require('../emailAuth')

// Configurações de transporte
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: auth.user, 
    pass: auth.pass 
  }
});

module.exports = transporter