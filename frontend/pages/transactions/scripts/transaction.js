import {toastError} from "./toastError.js"
import {parseJwt} from "./authorization.js"

const transactionForm = document.getElementById('transaction-form')
transactionForm.addEventListener('submit', async function(e){
    e.preventDefault()

    const type = this.parentNode.childNodes[1].type    
    
    const description = document.getElementById('description-transaction').value
    const category = document.getElementById('category-transaction').value
    const paymentMethod = document.getElementById('paymentMethod-transaction').value
    const stats = document.getElementById('stats-transaction').value
    const numberPayments = document.getElementById('numberPayments').value
    const date = document.getElementById('date-transaction').value
    let amount = document.getElementById('amount-transaction').value

    if (type == 'despesa') {
        amount *= -1
    }

    if (!description || !amount || !category || !paymentMethod || !stats || !numberPayments || !date) {
        toastError("Todos os campos devem ser preenchidos")
        return
    }

    try {
        const token = sessionStorage.getItem('token')
        const decodedToken = parseJwt(token)

        let response = await fetch(`http://localhost:3000/transacoes`, {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                descricao: description,
                categoria: category,
                metodoPagamento: paymentMethod,
                valor: amount,
                status:stats,
                qtdParcelas: numberPayments,
                dataTransacao: date,
                usuarioId: decodedToken.userId
            })
        });

        const data = await response.json()
        console.log(data)

        document.getElementById('transaction-form').reset()
        location.reload()
    } catch (error) {
        console.log(error)
    }

})

async function getTransactions({pagina=1,itensPorPagina=6}){
    try {
        const token = sessionStorage.getItem('token')
        
        let response = await fetch(`http://localhost:3000/transacoes?pagina=${pagina}&itensPorPagina=${itensPorPagina}`, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error);
        }    

        const data = await response.json()

        const tableContent = document.getElementById('transaction-content')

        tableContent.innerHTML = ''
        
        data.transacoes.forEach(transaction => {
            const transactionTable = document.createElement('tr')
            

            appendTransactionInformation(transaction.descricao, transactionTable)
            appendTransactionInformation(`R$${transaction.valor}`, transactionTable)
            appendTransactionInformation(transaction.CategoriaTransacao.nome, transactionTable)
            appendTransactionInformation(transaction.MetodoPagamento.nome, transactionTable)
            appendTransactionInformation(transaction.qtdParcelas, transactionTable)
            appendTransactionInformation(corrigirFusoHorario(transaction.dataTransacao), transactionTable)
            if (transaction.status == "Pendente") {
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

        return data

    } catch (error) {
        console.log(error)
    }
}

const data = await getTransactions({pagina:1,itensPorPagina:9})

export function appendTransactionInformation(information, parent, color=undefined){
    const transactionDescription = document.createElement('th')
    transactionDescription.onclick = editTransaction
    transactionDescription.innerHTML = information    

    if (color) {
        transactionDescription.style.color = color
    }

    parent.appendChild(transactionDescription)
}

export function corrigirFusoHorario(dataStr) {
    const data = new Date(dataStr);

    const umDiaEmMilissegundos = 24 * 60 * 60 * 1000;
    const dataCorrigida = new Date(data.getTime() + umDiaEmMilissegundos);

    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dataFormatada = dataCorrigida.toLocaleDateString('pt-BR', options);

    return dataFormatada;
}

export async function deleteTransaction() {
    
    const transactionId = this.parentNode.parentNode.id

    try {

        const token = sessionStorage.getItem('token')

        let response = await fetch(`http://localhost:3000/transacoes/${transactionId}`, {
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        });

        const data = await response.json()
        location.reload()

        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

function editTransaction(){

    document.getElementById('edit-description-transaction').value = this.parentNode.childNodes[0].innerHTML
    document.getElementById('edit-amount-transaction').value = this.parentNode.childNodes[1].innerHTML

    const categoryOptions = document.getElementById('edit-category-transaction').options
    for (const option of categoryOptions) {
        if (option.innerHTML == this.parentNode.childNodes[2].innerHTML) {
            document.getElementById('edit-category-transaction').selectedIndex = option.index
        }
    }

    const paymentMethodOptions = document.getElementById('edit-paymentMethod-transaction').options
    for (const option of paymentMethodOptions) {
        if (option.innerHTML == this.parentNode.childNodes[3].innerHTML) {
            document.getElementById('edit-paymentMethod-transaction').selectedIndex = option.index
        }
    }

    const statsOptions = document.getElementById('edit-stats-transaction').options
    for (const option of statsOptions) {
        if (option.innerHTML == this.parentNode.childNodes[6].innerHTML) {
            document.getElementById('edit-stats-transaction').selectedIndex = option.index
        }
    }

    document.getElementById('edit-numberPayments').value = this.parentNode.childNodes[4].innerHTML
    
    document.getElementById('edit-date-transaction').value = formatStringDate(this.parentNode.childNodes[5].innerHTML)

    document.getElementById('edit-transaction-form').transactionId = this.parentNode.id

    Modal.open('editar','modal-editar-transacao')
}

document.getElementById('edit-transaction-form').addEventListener('submit', async function(e){
    e.preventDefault()

    const {transactionId} = this
    
    const description = document.getElementById('edit-description-transaction').value
    const category = document.getElementById('edit-category-transaction').value
    const paymentMethod = document.getElementById('edit-paymentMethod-transaction').value
    const stats = document.getElementById('edit-stats-transaction').value
    const numberPayments = document.getElementById('edit-numberPayments').value
    const date = document.getElementById('edit-date-transaction').value
    let amount = document.getElementById('edit-amount-transaction').value


    if (!description || !amount || !category || !paymentMethod || !stats || !numberPayments || !date) {
        toastError("Todos os campos devem ser preenchidos")
    }

    try {
        const token = sessionStorage.getItem('token')
        const decodedToken = parseJwt(token)

        let response = await fetch(`http://localhost:3000/transacoes/${transactionId}`, {
            method: 'PUT',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                descricao: description,
                categoria: category,
                metodoPagamento: paymentMethod,
                valor: amount,
                status:stats,
                qtdParcelas: 1,
                dataTransacao: date,
                usuarioId: decodedToken.userId
            })
        });

        const data = await response.json()

        document.getElementById('edit-transaction-form').reset()
        location.reload()
    } catch (error) {
        console.log(error)
    }

})

function formatStringDate(data) {
    var dia  = data.split("/")[0];
    var mes  = data.split("/")[1];
    var ano  = data.split("/")[2];
  
    return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}

export {data, getTransactions}