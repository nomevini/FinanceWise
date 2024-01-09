const MetodoPagamento = require("../models/paymentMethod")
const Usuario = require("../models/user")

const createPaymentMethod = async (req, res) => {
    try {
        const {nome, usuarioId} = req.body

        if (!nome || !usuarioId) {
            return res.status(400).json({message: "Campos obrigatórios não fornecidos"})
        }

        // verificar se o usuario existe
        const user = await Usuario.findOne({
            where: {
                id: usuarioId
            }
        })

        if (!user) {
            return res.status(404).json({message: "Usuário não encontrado"})
        }

        // verificar se o usuario já criou o metodo
        const methodExist = await MetodoPagamento.findOne({
            where: {
                nome: nome,
                usuarioId: usuarioId
            }
        })

        if (methodExist) {
            return res.status(409).json({message:"Usuario já criou esse método"})
        }

        const payementMethod = await MetodoPagamento.create({
            nome,
            usuarioId
        })

        return res.status(201).json({message: "Método criado", metodoPagamento: payementMethod})
    
    } catch (error) {
        return res.status(500).json({message:"Erro interno do servidor"})
    }
}

const getUserPaymentMethods = async (req, res) => {
    try {

        const {userId} = req.params

        if (!userId) {
            return res.status(400).json({ error: 'Campos obrigatórios não fornecidos.' });
        }

        let usuarioId = userId

        const usuarioExistente = await Usuario.findByPk(usuarioId);

        if (!usuarioExistente) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const metodoPagamentoUsuario = await MetodoPagamento.findAll({
            where: { usuarioId: usuarioId },
            attributes: ['nome', 'id'],
        });

        return res.status(200).json(metodoPagamentoUsuario)
          
    } catch (error) {
        return res.status(500).json({message:"Erro interno do servidor"})
    }
}

const getDefaultPaymentMethods = async (req, res) => {
    try {

        const {userId} = req.params

        if (!userId) {
            return res.status(400).json({ error: 'Campos obrigatórios não fornecidos.' });
        }

        let usuarioId = userId

        const usuarioExistente = await Usuario.findByPk(usuarioId);

        if (!usuarioExistente) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const userAdmin = 1;

        // buscar todas as categorias desses ususarios  
        const metodoPagamentoAdmin = await MetodoPagamento.findAll({
            where: { usuarioId: userAdmin },
            attributes: ['nome', 'id'],
        });
  
        return res.status(200).json(metodoPagamentoAdmin)
    } catch (error) {
        return res.status(500).json({message:"Erro interno do servidor"})
    }
}

const deletePaymentMethod = async (req, res) => {
    try {
        
        const userId = req.usuario.id
        const {nome} = req.body

        // verificar se o usuario existe
        const user = await Usuario.findOne({
            where: {
                id: userId
            }
        })

        if (!user) {
            return res.status(404).json({message: "Usuário não encontrado"})
        }

        // verificar se o metodo existe
        const method = await MetodoPagamento.findOne({
            where: {
                nome,
                usuarioId: userId
            }
        })

        if (!method) {
            return res.status(404).json({message: "Método de pagamento não encontrado"})
        }

        await MetodoPagamento.destroy({
            where: {
                nome,
                usuarioId: userId
            }
        })

        return res.status(200).json({message: "Método de pagamento excluído com sucesso"})

    } catch (error) {
        return res.status(500).json({message: "Erro interno do servidor"})
    }
}

module.exports = {
    createPaymentMethod,
    getDefaultPaymentMethods,
    getUserPaymentMethods,
    deletePaymentMethod
}