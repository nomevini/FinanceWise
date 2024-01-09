const Usuario = require('../models/user')
const MetaFinanceira = require('../models/financialGoal')

const createGoal = async (req, res) => {
    try {
        console.log(req.body)

        const {titulo, valor, descricao, dataInicio, dataFinal, usuarioId, status} = req.body
        
        
        if (!titulo || !valor || !descricao || !dataInicio || !dataFinal || !status) {
            return res.status(400).json({message: "Campos obrigatórios não fornecidos"})
        }


        const usuario = await Usuario.findOne({
            where: {
                id: usuarioId
            }
        })

        if (!usuario) {
            return res.status(404).json({message: "Usuario não encontrado"})
        }

        const meta = await MetaFinanceira.create({
            titulo,
            valor,
            descricao,
            dataInicio,
            dataFinal,
            status,
            usuarioId
        })

        return res.status(200).json({message: 'Meta criada com sucesso', meta: meta})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "erro interno do servidor"})
    }
}

const getGoals = async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 1;
        const itensPorPagina = parseInt(req.query.itensPorPagina) || 10;

        const usuarioId = req.usuario.id

        const usuario = await Usuario.findOne({
            where: {
                id: usuarioId
            }
        })

        if (!usuario) {
            return res.status(404).json({message: "Usuario não encontrado"})
        }
     
        const { count, rows } = await MetaFinanceira.findAndCountAll({
            offset: (pagina - 1) * itensPorPagina,
            limit: itensPorPagina,
            where: {
                usuarioId
            },
            order: [['createdAt', 'DESC']], // Adiciona esta linha para ordenar por data de publicação decrescente
        });

        const totalPaginas = Math.ceil(count / itensPorPagina);

        res.status(200).json({
            paginaAtual: pagina,
            totalPaginas: totalPaginas,
            metas: rows,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "erro interno do servidor"})
    }
}

const updateGoal = async (req, res) => {
    try {
        
        const {titulo, valor, descricao, dataInicio, dataFinal, usuarioId, status} = req.body
        const id = req.params.metaId

        if (!titulo || !valor || !descricao || !dataInicio || !dataFinal || !usuarioId || !status) {
            return res.status(400).json({message: "Campos obrigatórios não fornecidos"})
        }

        const usuario = await Usuario.findOne({
            where: {
                id: usuarioId
            }
        })

        if (!usuario) {
            return res.status(404).json({message: "Usuario não encontrado"})
        }

        const goal = await MetaFinanceira.findByPk(id)

        await goal.update({
            titulo,
            valor,
            descricao,
            dataInicio,
            dataFinal,
            status
        })

        return res.status(200).json({message: "Meta editada com sucesso"})

    } catch (error) {
        res.status(500).json({message: 'Erro interno do servidor'})
    }
}

const deleteGoal = async (req, res) => {
    try {

        const metaId = req.params.metaId
        const usuarioId = req.usuario.id

        const usuario = await Usuario.findOne({
            where: {
                id: usuarioId
            }
        })

        if (!usuario) {
            return res.status(404).json({message: "Usuario não encontrado"})
        }

        // verificar se a dica existe
        const meta = await MetaFinanceira.findOne({
            where: { id: metaId }
        })

        if (!meta) {
            return res.status(404).json({message: 'Meta não encontrada'})
        }

        await MetaFinanceira.destroy({where: {
            id: metaId
        }})

        return res.status(200).json({message: 'Meta deletada'})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Erro interno do servidor"})
    }
}

module.exports = {
    createGoal,
    getGoals,
    deleteGoal,
    updateGoal
}