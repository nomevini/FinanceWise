const Categoria = require('../models/transactionCategory')
const Dica = require('../models/financialTip')
require('../models/index')

const createTip = async (req, res) => {
    const {titulo, categoria, descricao} = req.body
    const {userId} = req.params
    
    try {
        
        if (!titulo || !categoria || !descricao) {
            return res.status(400).json({ error: 'Campos obrigatórios não fornecidos.'})
        }
        
        // buscar o id da categoria
        const categoryData = await Categoria.findOne({
            where: {
                nome: categoria,
            },
        });
        
        if (!categoryData) {
            return res.status(404).json({message: "Categoria não encontrada"})
        }
        
        const categoryId = categoryData.dataValues.id
        
        // Gerar um timestamp
        const dataPublicacao = Date.now()
  
        const newTip = await Dica.create({
            titulo,
            dataPublicacao,
            descricao,
            categoriaId: categoryId,
            idAdmin:userId
        })

        return res.status(200).json({message: "Nova dica criada", dica: newTip})

    } catch (error) {
        
    }
}

const getTip = async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 1;
        const itensPorPagina = parseInt(req.query.itensPorPagina) || 6;

        const { count, rows } = await Dica.findAndCountAll({
            offset: (pagina - 1) * itensPorPagina,
            limit: itensPorPagina,
            include: [{ model: Categoria, attributes: ['nome'] }],
            order: [['dataPublicacao', 'DESC']], // Adiciona esta linha para ordenar por data de publicação decrescente
        });

        const totalPaginas = Math.ceil(count / itensPorPagina);

        res.status(200).json({
            paginaAtual: pagina,
            totalPaginas: totalPaginas,
            dicas: rows,
        });

    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

const updateTip = async (req, res) => {
    try {
        const id = req.params.id; 
        const descricao = req.body.descricao; 

        const dicaExistente = await Dica.findByPk(id);

        if (!dicaExistente) {
            return res.status(404).json({ error: 'Dica financeira não encontrada.' });
        }

        await dicaExistente.update({
            descricao: descricao,
        });

        res.status(200).json({ message: 'Dica financeira atualizada com sucesso.', dica: dicaExistente });

    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

const deleteTip = async (req, res) => {
    try {
        const id = req.params.id;
    
        // Verifica se a dica existe
        const dicaExistente = await Dica.findByPk(id);
    
        if (!dicaExistente) {
          return res.status(404).json({ error: 'Dica não encontrada.' });
        }
    
        // Realiza a exclusão da dica
        await dicaExistente.destroy();
    
        res.status(200).json({ message: 'Dica excluída com sucesso.' });
    
      } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

module.exports = {
    createTip,
    getTip,
    updateTip,
    deleteTip
}