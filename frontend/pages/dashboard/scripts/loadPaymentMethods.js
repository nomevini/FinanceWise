import { toastError } from "./toastError.js"
import { parseJwt } from "./authorization.js";

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

            const paymentMethods = defaultPaymentMethods.concat(userPaymentMethods)
            sessionStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
            
        }else {
            sessionStorage.setItem('paymentMethods', JSON.stringify(defaultPaymentMethods));
            insertPaymentMethodOnSelect(defaultPaymentMethods)
          
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

    })
}