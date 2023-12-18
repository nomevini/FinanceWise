const sequelize = require('../db/connection'); 

const FinancialGoal = require('./financialGoal')
const TransactionCategory = require('./transactionCategory')
const PaymentMethod = require('./paymentMethod')
const User = require('./user'); 
const FinancialTip = require('./financialTip')
const Transaction = require('./transaction')

// Transacao - Categoria
TransactionCategory.hasMany(Transaction, { foreignKey: 'categoria' });
Transaction.belongsTo(TransactionCategory, { foreignKey: 'categoria' });

// Transacao - MetodoPagamento
PaymentMethod.hasMany(Transaction, { foreignKey: 'metodoPagamento' });
Transaction.belongsTo(PaymentMethod, { foreignKey: 'metodoPagamento' });

// Transacao - MetaFinanceira
FinancialGoal.hasMany(Transaction, { foreignKey: 'metaId' });
Transaction.belongsTo(FinancialGoal, { foreignKey: 'metaId' });

// Usuario - MetaFinanceira
User.hasMany(FinancialGoal, { foreignKey: 'usuarioId' });
FinancialGoal.belongsTo(User, { foreignKey: 'usuarioId' });

// Transacao -  Usuario
User.hasMany(Transaction, { foreignKey: 'usuarioId' });
Transaction.belongsTo(User, { foreignKey: 'usuarioId' });

// Usuario - DicaFinanceira
User.hasMany(FinancialTip, { foreignKey: 'idAdmin' });
FinancialTip.belongsTo(User, { foreignKey: 'idAdmin' });

// Categoria - DicaFinanceira
TransactionCategory.hasMany(FinancialTip, { foreignKey: 'categoriaId' });
FinancialTip.belongsTo(TransactionCategory, { foreignKey: 'categoriaId' });

// CategoriaTransacao - Usuario
User.hasMany(TransactionCategory, { foreignKey: 'usuarioId' });
TransactionCategory.belongsTo(User, { foreignKey: 'usuarioId' });

// MetodoPagamento - Usuario
User.hasMany(PaymentMethod, { foreignKey: 'usuarioId' });
PaymentMethod.belongsTo(User, { foreignKey: 'usuarioId' });

/* sequelize.sync()
  .then(() => {
    console.log('Tabelas criadas com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao criar tabelas:', error);
  }); */