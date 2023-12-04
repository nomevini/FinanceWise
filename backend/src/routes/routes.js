const express = require('express')
const { registerUser, deleteUser, login, resetPassword, updatePassword } = require('../controllers/user')
const authentication = require('../middlewares/authentication')

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

routes.post('/categoria', ) // cadastrar uma categoria
routes.get('/categoria', ) // listar uma categoria
routes.post('/metodo-pagamento') // cadastrar um metodo de pagamento
routes.get('/metodo-pagamento') // listar os metodos de pagamento
routes.get('/relatorio') // gerar relatorio de gastos mensais
routes.get('/transacoes/filtrar') // filtrar transacao

routes.get('/dica') // listar dicas financeiras
routes.post('/post') // postar dica financeira
routes.put('/post') // editar dica financeira

routes.get('/metas') // listar metas financeiras
routes.post('/metas') // criar meta financeira
routes.put('/metas') // editar meta financeira

module.exports = routes