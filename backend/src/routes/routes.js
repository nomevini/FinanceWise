const express = require('express')
const { registerUser, deleteUser, login, resetPassword, updatePassword } = require('../controllers/user')
const authentication = require('../middlewares/authentication')
const { createTip, getTip, updateTip, deleteTip } = require('../controllers/tip')
const { createCategory, getCategory } = require('../controllers/category')

const routes = express()

// rotas publicas

routes.post('/login', login) // realizar login
routes.post('/usuario', registerUser) // realizar cadastro
routes.post('/recuperar-senha', resetPassword) 
routes.put('/atualizar-senha/:token', updatePassword) 

// middlewares de autenticacao
routes.use(authentication)

// rotas privadas
routes.put('/usuario', ) // Editar usuario
routes.delete('/usuario', deleteUser) // Deletar usuario

routes.get('/balanco', ) // buscar despesa mensal, receita mensal e balanco
routes.get('/transacoes', ) // listar as despesas de um usuario
routes.post('/transacoes', ) // cadastrar uma despesa ou receita de um usuario
routes.put('/transacoes', ) // editar uma despesa ou receita de um usuario

routes.post('/categoria', createCategory) // cadastrar uma categoria
routes.get('/categoria/:userId', getCategory) // listar uma categoria
routes.post('/metodo-pagamento') // cadastrar um metodo de pagamento
routes.get('/metodo-pagamento') // listar os metodos de pagamento
routes.get('/relatorio') // gerar relatorio de gastos mensais
routes.get('/transacoes/filtrar') // filtrar transacao

routes.post('/dica/:userId', createTip) // postar dica financeira
routes.get('/dicas', getTip) // listar dicas financeiras
routes.put('/dica/:id', updateTip) // editar dica financeira
routes.delete('/dica/:id', deleteTip) // deletar uma dica financeira

routes.get('/metas') // listar metas financeiras
routes.post('/metas') // criar meta financeira
routes.put('/metas') // editar meta financeira

module.exports = routes