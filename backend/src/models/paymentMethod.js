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
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true,
});

module.exports = PaymentMethod