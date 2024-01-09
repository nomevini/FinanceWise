const express = require('express')
const { registerUser, deleteUser, login, resetPassword, updatePassword, updateUser, getUser} = require('../controllers/user')
const authentication = require('../middlewares/authentication')
const { createTip, getTip, updateTip, deleteTip } = require('../controllers/tip')
const { createCategory, getDefaultCategories, deletecategory, getUserCategories } = require('../controllers/category')
const {createGoal, getGoals, deleteGoal, updateGoal} = require('../controllers/goals')
const { createTransaction, getTransaction, updateTransaction, deleteTransaction } = require('../controllers/transaction')
const { createPaymentMethod, getPaymentMethods, deletePaymentMethod, getDefaultPaymentMethods, getUserPaymentMethods } = require('../controllers/paymentMethod')
const routes = express()
const multer = require('multer');
const { transactionNameFilter, transactionFilter } = require('../controllers/filter')
const { relatorioMensal } = require('../controllers/report')

// rotas publicas

routes.post('/login', login) // realizar login
routes.post('/usuario', registerUser) // realizar cadastro
routes.post('/recuperar-senha', resetPassword) 
routes.put('/atualizar-senha/:token', updatePassword) 

// middlewares de autenticacao
routes.use(authentication)

// rotas privadas
routes.get('/usuario/:userId', getUser)
routes.put('/usuario/:userId', updateUser) // Editar usuario
routes.delete('/usuario', deleteUser) // Deletar usuario

routes.get('/balanco', relatorioMensal) // buscar despesa mensal, receita mensal e balanco
routes.get('/transacoes', getTransaction) // listar as despesas de um usuario
routes.post('/transacoes', createTransaction) // cadastrar uma despesa ou receita de um usuario
routes.put('/transacoes/:id', updateTransaction) // editar uma despesa ou receita de um usuario
routes.delete('/transacoes/:id', deleteTransaction) // editar uma despesa ou receita de um usuario

routes.get('/transacoes/filtrar-desc', transactionNameFilter) // filtrar transacao
routes.get('/transacoes/filtrar', transactionFilter) // filtrar transacao

routes.post('/categoria', createCategory) // cadastrar uma categoria
routes.get('/categoria-sistema/:userId', getDefaultCategories) // listar uma categoria
routes.get('/categoria-usuario/:userId', getUserCategories) // listar uma categoria
routes.delete('/categoria/:userId', deletecategory)

routes.post('/metodo-pagamento', createPaymentMethod) // cadastrar um metodo de pagamento
routes.get('/metodo-pagamento-sistema/:userId', getDefaultPaymentMethods) // listar os metodos de pagamento padroes
routes.get('/metodo-pagamento-usuario/:userId', getUserPaymentMethods) // listar os metodos de pagamento do usuario
routes.delete('/metodo-pagamento/:id', deletePaymentMethod) // deletar um metodo de pagamento

routes.get('/relatorio') // gerar relatorio de gastos mensais

routes.post('/dica/:userId', createTip) // postar dica financeira
routes.get('/dicas', getTip) // listar dicas financeiras
routes.put('/dica/:id', updateTip) // editar dica financeira
routes.delete('/dica/:id', deleteTip) // deletar uma dica financeira

routes.post('/meta', createGoal) // criar meta financeira
routes.get('/metas', getGoals) // listar metas financeiras
routes.put('/meta/:metaId', updateGoal) // editar meta financeira
routes.delete('/meta/:metaId', deleteGoal) // editar meta financeira

module.exports = routes