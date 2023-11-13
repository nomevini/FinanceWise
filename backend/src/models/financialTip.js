const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection'); 

const FinancialTip = sequelize.define('DicaFinanceira', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataPublicacao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
});

module.exports = FinancialTip