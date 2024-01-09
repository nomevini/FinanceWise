import { appendTransactionInformation, corrigirFusoHorario, deleteTransaction } from "./transaction.js"

document.getElementById('filter-transaction-form').addEventListener('submit', async function(e) {
    e.preventDefault()

    const description = document.getElementById('filter-description-transaction').value
    const category = document.getElementById('filter-category-transaction').value
    const paymentMethod = document.getElementById('filter-paymentMethod-transaction').value
    const stats = document.getElementById('filter-stats-transaction').value
    const numberPayments = document.getElementById('filter-numberPayments').value
    const date = document.getElementById('filter-date-transaction').value
    let amount = document.getElementById('filter-amount-transaction').value

    const categories = JSON.parse(sessionStorage.getItem('categories'));
    let categoryId; 
    categories.forEach(categoryEle => {
        if(categoryEle.nome == category){
            categoryId = categoryEle.id
        }
    })

    const paymentMethods = JSON.parse(sessionStorage.getItem('paymentMethods'));
    let paymentMethodId; 
    paymentMethods.forEach(paymentMethodEle => {
        if(paymentMethodEle.nome == paymentMethod){
            paymentMethodId = paymentMethodEle.id
        }
    })


    // Construa o objeto de filtro
    const filtro = {};
    if (description) filtro.descricao = description;
    if (categoryId) filtro.categoria = categoryId;
    if (paymentMethodId) filtro.metodoPagamento = paymentMethodId;
    if (amount) filtro.valor = amount;
    if (stats) filtro.status = stats;
    if (numberPayments) filtro.qtdParcelas = numberPayments;
    if (date) filtro.dataTransacao = date;
  
    // Faça a requisição ao backend somente se pelo menos um campo estiver preenchido
    if (Object.keys(filtro).length > 0) {
      // Construa a URL com os parâmetros de filtro
      const queryString = new URLSearchParams(filtro).toString();
      const url = `http://localhost:3000/transacoes/filtrar?${queryString}`;

      const token = sessionStorage.getItem('token')
  
      // Faça a requisição ao backend
      const response = await fetch(url, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            }
        });

      const transacoesFiltradas = await response.json();
  
      loadTransaction(transacoesFiltradas);
      this.reset()
      Modal.close('modal-filtrar')
    }

})

document.getElementById('btn-filter-name').addEventListener('click', async function(){
    const descricao = document.getElementById('search-bar').value

    const token = sessionStorage.getItem('token')
    
    try {
        let response = await fetch(`http://localhost:3000/transacoes/filtrar-desc?descricao=${descricao}`, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const error = await response.json()
            throw new Error(response.message);
        }

        const data = await response.json()
        loadTransaction(data)    

    } catch (error) {
        console.log(error)
    }
})

function loadTransaction(data){
    console.log(data)

    const tableContent = document.getElementById('transaction-content')

        tableContent.innerHTML = ''
        
        data.forEach(transaction => {
        const transactionTable = document.createElement('tr')
        
        appendTransactionInformation(transaction.descricao, transactionTable)
        appendTransactionInformation(transaction.valor, transactionTable)
        appendTransactionInformation(transaction.CategoriaTransacao.nome, transactionTable)
        appendTransactionInformation(transaction.MetodoPagamento.nome, transactionTable)
        appendTransactionInformation(transaction.qtdParcelas, transactionTable)
        appendTransactionInformation(corrigirFusoHorario(transaction.dataTransacao), transactionTable)
        if (transaction.status == "pendente") {
            appendTransactionInformation(transaction.status, transactionTable, 'red')
        }else {
            appendTransactionInformation(transaction.status, transactionTable, 'green')
        }
        
        transactionTable.id = transaction.id

        const btnImg = document.createElement('img')
        btnImg.src = './assets/excluir.png'
        btnImg.alt = 'Deletar categoria'

        const btnDeleteTransacao = document.createElement('button')
        btnDeleteTransacao.addEventListener('click', deleteTransaction)
        btnDeleteTransacao.id = 'btn-deletar-transacao'
        btnDeleteTransacao.appendChild(btnImg)

        const btn = document.createElement('th')
        btn.appendChild(btnDeleteTransacao)

        transactionTable.appendChild(btn)

        tableContent.appendChild(transactionTable)
    });

}