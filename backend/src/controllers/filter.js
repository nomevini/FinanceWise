const Transacao = require('../models/transaction')
const Categoria = require('../models/transactionCategory')
const MetodoPagamento = require('../models/paymentMethod')
const { Op } = require('sequelize');

const transactionNameFilter = async (req, res) => {
    try {
      const { descricao } = req.query;
  
      const conditions = {};
      
      if (descricao) {
        conditions.descricao = {
          [Op.iLike]: `%${descricao}%`, // iLike para uma busca case-insensitive
        };
      }

      console.log(conditions)
  
      const transacoesFiltradas = await Transacao.findAll({
        where: conditions,
        include: [{ model: Categoria, attributes: ['nome'] }, {model: MetodoPagamento, attributes: ['nome']}],
        order: [['dataTransacao', 'DESC']]
      });
  
      res.json(transacoesFiltradas);
    } catch (error) {
      console.error('Erro ao filtrar transações:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const transactionFilter =async (req, res) => {
  try {
    // Extraindo parâmetros da requisição
    const parametrosFiltro = req.query;

    // Mapeamento de parâmetros para campos no modelo Sequelize
    const parametroCampoMap = {
      descricao: { campo: 'descricao', operador: Op.iLike },
      categoria: { campo: 'categoria', operador: Op.eq },
      metodoPagamento: { campo: 'metodoPagamento', operador: Op.eq },
      valor: { campo: 'valor', operador: Op.eq },
      status: { campo: 'status', operador: Op.eq },
      qtdParcelas: { campo: 'qtdParcelas', operador: Op.eq },
      dataTransacao: { campo: 'dataTransacao', operador: Op.eq }, // Utilize o operador Op.gte para incluir a data exata
    };

    // Construindo as condições de filtro
    const conditions = {};
    Object.keys(parametrosFiltro).forEach(parametro => {
      if (parametroCampoMap[parametro] && parametrosFiltro[parametro] !== undefined) {
        const { campo, operador } = parametroCampoMap[parametro];

        // Verificando se o valor não é nulo
        if (parametro === 'dataTransacao') {
          conditions[campo] = {
            [operador]: new Date(parametrosFiltro[parametro]),
          };
        } else {
          conditions[campo] = {
            [operador]: operador === Op.iLike
              ? `%${parametrosFiltro[parametro]}%`
              : parametrosFiltro[parametro],
          };
        }
      }
    });

    // Realizando a busca no banco de dados
    const transacoesFiltradas = await Transacao.findAll({
      where: conditions,
      include: [{ model: Categoria, attributes: ['nome'] }, {model: MetodoPagamento, attributes: ['nome']}],
      order: [['dataTransacao', 'DESC']], 
    });

    // Retornando os resultados
    res.json(transacoesFiltradas);
  } catch (error) {
    console.error('Erro ao filtrar transações:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


module.exports = {
    transactionNameFilter,
    transactionFilter
}