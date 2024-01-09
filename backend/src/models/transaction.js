const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection'); // Substitua com a importação da sua conexão

const Transaction = sequelize.define('Transacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  metodoPagamento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  qtdParcelas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dataTransacao: {
    type: DataTypes.DATE,
    allowNull: false
  },
  metaId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true,
});

module.exports = Transaction