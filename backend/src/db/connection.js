const { Sequelize } = require('sequelize');
const credentials = require('../../pg_credentials')

const sequelize = new Sequelize('meconta', credentials.user, credentials.password, {
  host: 'localhost', // Endereço do servidor PostgreSQL
  dialect: 'postgres', // Tipo de banco de dados
});

module.exports = sequelize;