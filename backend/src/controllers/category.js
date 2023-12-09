const Categoria = require('../models/transactionCategory')
const Usuario = require('../models/user')

const createCategory = async (req, res) => {
    const { nome, userId } = req.body;

    try {
        if (!nome || !userId) {
            return res.status(400).json({ error: 'Campos obrigatórios não fornecidos.' });
        }

        const usuarioId = userId

        const usuarioExistente = await Usuario.findByPk(usuarioId);
        if (!usuarioExistente) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Verifica se o usuário já cadastrou a categoria
        const categoriaExistente = await Categoria.findOne({ where: { nome, usuarioId,},});

        if (categoriaExistente) {
            // Categoria já existe para o usuário
            return res.status(400).json({ error: 'Usuário já cadastrou essa categoria.' });
        }

        // verificar se a categoria não é padrão do sistema
        const categoriaAdminExistente = await Categoria.findOne({
            where: {
            nome,
            usuarioId: 1,
            },
        });
  
        if (categoriaAdminExistente) {
            // Categoria já existe para o usuário e é padrão do sistema
            return res.status(400).json({ error: 'A categoria adicionada é padrão do sistema.' });
        }

        // Cria a nova categoria
        const novaCategoria = await Categoria.create({nome, usuarioId,});

        res.status(201).json({ message: 'Categoria criada com sucesso.', categoria: novaCategoria });
    } catch (error) {
        console.error('Erro ao criar/verificar categoria:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

const getCategory = async (req, res) => {
    const {userId} = req.params

    try {

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
        const categoriasAdmin = await Categoria.findAll({
            where: { usuarioId: userAdmin },
            attributes: ['nome'],
        });
  
        const categoriasUsuario = await Categoria.findAll({
            where: { usuarioId: usuarioId },
            attributes: ['nome'],
        });

        if (!categoriasUsuario.length) {
            return res.status(200).json(categoriasAdmin)
        }else if (userId == userAdmin) {
            return res.status(200).json(categoriasAdmin) // se o usuario for admin
        }else {
            return res.status(200).json(categoriasAdmin.concat(categoriasUsuario))
        }   
    } catch (error) {
        console.error('Erro ao criar/verificar categoria:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

module.exports = {
    createCategory,
    getCategory
};
