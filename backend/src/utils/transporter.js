const nodemailer = require('nodemailer');
const auth = require('../emailAuth')

// Configurações de transporte
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use o serviço de e-mail desejado
  auth: {
    user: auth.user, // Seu endereço de e-mail
    pass: auth.pass // Sua senha de e-mail
  }
});

module.exports = transporter