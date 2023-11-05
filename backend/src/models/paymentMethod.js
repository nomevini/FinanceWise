const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const PaymentMethod = sequelize.define('MetodoPagamento', {
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
  renovarSaldo: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  valorAdicionado: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  dataRenovacao: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  freezeTableName: true,
});

module.exports = PaymentMethod