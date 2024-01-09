import { toastError } from "./toastError.js"
import { parseJwt } from "./authorization.js";

document.getElementById('category-form').addEventListener('submit', async function(e) {
    
    const descricao = document.getElementById('description-category')
    
    if(!descricao.value){
        toastError("Campo nome inválido")   
        e.preventDefault()
        return
    }
    
    await createCategory(descricao.value)
    
})

async function createCategory(nameCategory) {
    try {
        const token = sessionStorage.getItem('token')
        const decodedToken = parseJwt(token)
  
        const category = {
            nome: nameCategory,
            usuarioId: decodedToken.userId
        }

        let response = await fetch(`http://localhost:3000/categoria`, {
                method: 'POST',
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(category)
        });

        if (!response.ok) {
            const error = await response.json()
            throw new Error(response.message);
        }

        console.log("Categoria cadastrada com sucesso")
  
        // Limpe o formulário
        document.getElementById("category-form").reset();
        location.reload()
    } catch (error) {
        console.error('Erro na criação da categoria:', error);
        toastError(error.message)
    }
}

export async function deletarCategoria() {
    const nome = this.parentNode.childNodes[0].innerHTML
 
    const token = sessionStorage.getItem('token')
    const decodedToken = parseJwt(token)

    let response = await fetch(`http://localhost:3000/categoria/${decodedToken.userId}`, {
        method: 'DELETE',
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome
        })
    });

    const data = await response.json()
    console.log(data)
    location.reload()

}