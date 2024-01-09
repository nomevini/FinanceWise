import { toastError } from "./toastError.js"
import { parseJwt } from "./authorization.js";

document.getElementById('paymentMethod-form').addEventListener('submit', async function(e) {
    try {
    
        e.preventDefault()

        const nome = document.getElementById('description-payment').value

        if(!nome){
            toastError("Campos obrigatórios não preenchidos")   
            e.preventDefault()
            return
        }  
    
        const token = sessionStorage.getItem('token')
        const decodedToken = parseJwt(token)
    
        const paymentMethod = {
            nome,
            usuarioId: decodedToken.userId
        }

        let response = await fetch(`http://localhost:3000/metodo-pagamento`, {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentMethod)
        });

        if (!response.ok) {
            const error = await response.json()
            throw new Error(response.message);
        }

        console.log("Método de pagamento cadastrado com sucesso")
  
        // Limpe o formulário
        this.reset();
        location.reload()

    } catch (error) {
        console.error('Erro na criação do método de pagamento:', error);
        toastError(error.message)
    }
})

export async function deletarMetodoPagamento() {

    try {
        const nome = this.parentNode.childNodes[0].innerHTML
 
        const token = sessionStorage.getItem('token')
        const decodedToken = parseJwt(token)
    
        let response = await fetch(`http://localhost:3000/metodo-pagamento/${decodedToken.userId}`, {
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({nome})
        });
    
        const data = await response.json()
        location.reload()
           
    } catch (error) {
        console.log(error.message) 
        toastError(error.message)       
    }
 
}