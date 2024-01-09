const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection'); 

const FinancialTip = require('./financialTip')
const Transaction = require('./transaction')

const User = sequelize.define('Usuario', {
  // Defina os campos da tabela e seus tipos de dados
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sobrenome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataNascimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imagemPerfil: {
    type: DataTypes.STRING,
    allowNull: true, // Pode ser nulo se o usuário não tiver uma imagem
  }
}, {
  freezeTableName: true,
});


module.exports = User