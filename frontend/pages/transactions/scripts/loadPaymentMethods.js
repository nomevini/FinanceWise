import { toastError } from "./toastError.js"
import { parseJwt } from "./authorization.js";
import { deletarMetodoPagamento } from "./paymentMethod.js"

async function loadPaymentMethods() {

    const token = sessionStorage.getItem('token')
    const decodedToken = parseJwt(token);

    try {
        let response = await fetch(`http://localhost:3000/metodo-pagamento-sistema/${decodedToken.userId}`, {
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
        
        let defaultPaymentMethods = await response.json()
        let userPaymentMethods = undefined

        if (!decodedToken.admin) {
            // usuario comum
            // carregar suas categorias
            let response = await fetch(`http://localhost:3000/metodo-pagamento-usuario/${decodedToken.userId}`, {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
            });

            userPaymentMethods = await response.json()  
            insertPaymentMethodOnSelect(userPaymentMethods)
            insertPaymentMethodOnSelect(defaultPaymentMethods)
            insertPaymentMethodOnMyCategories(userPaymentMethods)

            const paymentMethods = defaultPaymentMethods.concat(userPaymentMethods)
            sessionStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
            
        }else {
            sessionStorage.setItem('paymentMethods', JSON.stringify(defaultPaymentMethods));
            insertPaymentMethodOnSelect(defaultPaymentMethods)
            insertPaymentMethodOnMyCategories(defaultPaymentMethods)
        }


    } catch (error) {
        console.error(error);
        toastError(error.message)
    }
}

loadPaymentMethods()

function insertPaymentMethodOnSelect(paymentMethods) {
    paymentMethods.forEach(method => {
        const selectElement = document.getElementById('paymentMethod-transaction');
        const editSelectElement = document.getElementById('edit-paymentMethod-transaction')
        const filterSelectElement = document.getElementById('filter-paymentMethod-transaction')

        const option = document.createElement('option');
        option.text = method.nome;
        selectElement.appendChild(option);

        const option2 = document.createElement('option');
        option2.text = method.nome;
        editSelectElement.appendChild(option2)

        const option3 = document.createElement('option');
        option3.text = method.nome;
        filterSelectElement.appendChild(option3)
    })
}

function insertPaymentMethodOnMyCategories(paymentMethods) {
    paymentMethods.forEach(method => {
        // inserir nas categorias já criadas
        const divCategories = document.querySelector(".paymentMethods")

        const divCategoria = document.createElement('div')
        divCategoria.className = 'input-group'
        divCategoria.id = 'delete-payment'

        const nomeCategoria = document.createElement('p')
        nomeCategoria.innerHTML = method.nome

        const btnImg = document.createElement('img')
        btnImg.src = './assets/minus.svg'
        btnImg.alt = 'Deletar método de pagamento'

        const btnDeletarMetodo = document.createElement('button')
        btnDeletarMetodo.appendChild(btnImg)
        btnDeletarMetodo.addEventListener('click', deletarMetodoPagamento)

        divCategoria.appendChild(nomeCategoria)
        divCategoria.appendChild(btnDeletarMetodo)

        divCategories.appendChild(divCategoria)
    });
}