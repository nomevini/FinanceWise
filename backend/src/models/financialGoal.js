const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/connection'); // Substitua com a importação da sua conexão

const FinancialGoal = sequelize.define('MetaFinanceira', {
  // Defina os campos da tabela e seus tipos de dados
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
  },
  dataInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dataFinal: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true,
});

module.exports = FinancialGoal