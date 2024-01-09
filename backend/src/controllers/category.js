const Categoria = require('../models/transactionCategory')
const Usuario = require('../models/user')

const createCategory = async (req, res) => {
    const { nome, usuarioId } = req.body;

    try {
        if (!nome || !usuarioId) {
            return res.status(400).json({ error: 'Campos obrigatórios não fornecidos.' });
        }

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
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

const getUserCategories = async (req, res) => {
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

        const categoriasUsuario = await Categoria.findAll({
            where: { usuarioId: usuarioId },
            attributes: ['nome', 'id'],
        });

        return res.status(200).json(categoriasUsuario)   
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}


const getDefaultCategories = async (req, res) => {
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
            attributes: ['nome', 'id'],
        });
  
        return res.status(200).json(categoriasAdmin)   
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

const deletecategory = async (req, res) => {
    try {
        const usuarioId = req.params.userId
        const {nome} = req.body


        const user = await Usuario.findByPk(usuarioId)

        if (!user) {
            return res.status(404).json({message: 'Usuário não encontrado'})
        }

        const categoria = await Categoria.findOne({
            where: {
                usuarioId,
                nome
            }
        })

        if (!categoria) {
            return res.status(404).json({message: "Categoria não encontrada"})
        }

        await Categoria.destroy({
            where: {
                usuarioId,
                nome
            }
        })

        return res.status(200).json({message: "Categoria excluída com sucesso"})

    } catch (error) {
        return res.status(500).json({message: "erro interno do servidor"})
    }
}

module.exports = {
    createCategory,
    getDefaultCategories,
    deletecategory,
    getUserCategories
};
