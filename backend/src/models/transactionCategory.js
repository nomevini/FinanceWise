const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection'); // Substitua com a importação da sua conexão

const TransactionCategory = sequelize.define('CategoriaTransacao', {
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
    unique: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false
  },
}, {
  freezeTableName: true,
});

module.exports = TransactionCategory