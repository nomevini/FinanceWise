const express = require('express')

const routes = express()

// rotas publicas

routes.post('/login', ) // realizar login
routes.post('/usuarios', ) // realizar cadastro
routes.post('/recuperar-senha', ) 
routes.put('/atualizar-senha', ) 

// rotas privadas

routes.put('/usuarios', ) // Editar usuario

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