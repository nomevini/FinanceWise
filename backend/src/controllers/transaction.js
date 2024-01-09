const User = require('../models/user')
const MetodoPagamento = require('../models/paymentMethod')
const Categoria = require('../models/transactionCategory')
const Transacao = require('../models/transaction')

const createTransaction = async (req, res) => {
    try {
        let {descricao, categoria, metodoPagamento, valor, status, qtdParcelas, dataTransacao, metaId, usuarioId} = req.body
        
        // verificar informacoes
        if (!descricao || !categoria || !metodoPagamento || !valor || !status || !qtdParcelas || !dataTransacao || !usuarioId) {
            return res.status(400).json({ error: 'Campos obrigatórios não fornecidos.'})  
        }
        
        // verificar se o usuario existe
        const user = await User.findByPk(usuarioId)
        
        if (!user) {
            return res.status(404).json({message: 'Usuário não encontrado'})
        }

        // verificar se o metodo de pagamento existe
        const payment = await MetodoPagamento.findOne({
            where: {
                nome: metodoPagamento
            }
        })

        if (!payment) {
            return res.status(404).json({message: "Metodo de pagamento não cadastrado"})
        }

        // capturar id do metodo
        const paymentId = payment.dataValues.id
    
        // verificar se a categoria existe
        const category = await Categoria.findOne({
            where: {
                nome: categoria
            }
        })

        if (!category) {
            return res.status(404).json({message: "Categoria não existente"})
        }

        const categoryId = category.dataValues.id

        if (qtdParcelas > 1) {
            // se a transacao for parcelada, dividir o valor em parcelas e inserir varias contas nos meses seguintes4

            // Calcular o valor de cada parcela
            const valorParcela = valor / qtdParcelas;

            // Criar transações para cada parcela nos meses seguintes
            const data = new Date(dataTransacao);
            let counter = qtdParcelas

            for (let i = 0; i < qtdParcelas; i++) {

                await Transacao.create({
                    descricao,
                    categoria: categoryId,
                    metodoPagamento: paymentId,
                    valor: valorParcela,
                    qtdParcelas: counter,
                    dataTransacao: data,
                    metaId,
                    usuarioId,
                    status,
                });

              
                const mesAtual = data.getMonth()
              
                if (mesAtual == 11) {
                    data.setMonth(0);
                    data.setYear(data.getFullYear() + 1)
                }else {
                    data.setMonth(mesAtual + 1);
                }
                counter--;
            }

            return res.status(201).json({message: "transações criadas"})

        }else {
            // senão, inserir no mes atual
            const transaction = await Transacao.create({
                descricao,
                categoria: categoryId,
                metodoPagamento: paymentId,
                valor,
                qtdParcelas,
                dataTransacao,
                metaId,
                usuarioId,
                status
            })

            return res.status(201).json({message: 'transação cadastrada', transaction})
        }

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Erro interno do servidor"})
    }
}

const getTransaction = async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 1;
        const itensPorPagina = parseInt(req.query.itensPorPagina) || 6;

        const usuarioId = req.usuario.id


        const { count, rows } = await Transacao.findAndCountAll({
            offset: (pagina - 1) * itensPorPagina,
            limit: itensPorPagina,
            where: {
                usuarioId
            },
            include: [{ model: Categoria, attributes: ['nome'] }, {model: MetodoPagamento, attributes: ['nome']}],
            order: [['dataTransacao', 'DESC']], // Adiciona esta linha para ordenar por data de publicação decrescente
        });

        const totalPaginas = Math.ceil(count / itensPorPagina);

        res.status(200).json({
            paginaAtual: pagina,
            totalPaginas: totalPaginas,
            transacoes: rows,
        });

    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

const updateTransaction = async (req, res) => {
    try {
        let {descricao, categoria, metodoPagamento, valor, status, qtdParcelas, dataTransacao, metaId, usuarioId} = req.body
        const transactionId = req.params.id
        
        // verificar informacoes
        if (!descricao || !categoria || !metodoPagamento || !valor || !status || !qtdParcelas || !dataTransacao || !usuarioId) {
            return res.status(400).json({ error: 'Campos obrigatórios não fornecidos.'})  
        }
        
        // verificar se o usuario existe
        const user = await User.findByPk(usuarioId)
        
        if (!user) {
            return res.status(404).json({message: 'Usuário não encontrado'})
        }

        // verificar se o metodo de pagamento existe
        const payment = await MetodoPagamento.findOne({
            where: {
                nome: metodoPagamento
            }
        })

        if (!payment) {
            return res.status(404).json({message: "Metodo de pagamento não cadastrado"})
        }

        // capturar id do metodo
        const paymentId = payment.dataValues.id

        // verificar se a categoria existe
        const category = await Categoria.findOne({
            where: {
                nome: categoria
            }
        })

        if (!category) {
            return res.status(404).json({message: "Categoria não existente"})
        }

        const categoryId = category.dataValues.id

        const transaction = await Transacao.findByPk(transactionId)

        if (!transaction) {
            return res.status(404).json({message: "Transação não encontrada"})
        }

        await Transacao.update({
            descricao,
            categoria: categoryId,
            metodoPagamento: paymentId,
            valor,
            qtdParcelas,
            dataTransacao,
            metaId,
            usuarioId,
            status
        }, {
            where: {
                id: transactionId
            }
        })

        return res.status(200).json({message: "Transação alterada"})
    
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Erro interno do servidor"})
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const usuarioId = req.usuario.id
        const transactionId = req.params.id

        const user = await User.findByPk(usuarioId)

        if (!user) {
            return res.status(404).json({message: "Usuário não encontrado"})
        }

        const transaction = await Transacao.findOne({
            where: {
                id: transactionId,
                usuarioId
            }
        })

        if (!transaction) {
            return res.status(404).json({message: "transação não encontrada"})
        }

        await transaction.destroy()

        return res.status(201).json({message: "Transação deletada"})
    } catch (error) {
        return res.status(500).json({message: "Erro interno do servidor"})
    }
}


module.exports = {
    createTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction
}