import { parseJwt } from "./authorization.js";
import { toastError } from "./toastError.js";

// Função para adicionar uma meta à tabela
async function createGoal() {
    try {
        
        const token = sessionStorage.getItem('token')
        const decodedToken = parseJwt(token)
  
        const goal = {
            titulo: document.getElementById("title-create").value,
            valor: document.getElementById("amount-create").value,
            descricao: document.getElementById("description-create").value,
            dataInicio: document.getElementById("start-date-create").value,
            dataFinal: document.getElementById("end-date-create").value,
            status: document.getElementById("stats-create").value,
            usuarioId: decodedToken.userId
        }

        let response = await fetch(`http://localhost:3000/meta`, {
                method: 'POST',
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(goal)
        });

        if (!response.ok) {
            const error = await response.json()
            throw new Error(response.message);
        }

        console.log("Dica cadastrada com sucesso")
        // Feche o modal
        Modal.close('modal-meta');
        
        // Limpe o formulário
        document.getElementById("goal-form").reset();

        location.reload()

            
    } catch (error) {
        console.error('Erro na criação da meta:', error);
        toastError(error.message)
    }
}

const createGoalButton = document.querySelector('.create-goal')
createGoalButton.addEventListener('click', function(event){
    event.preventDefault()

    // Obtenha os valores do formulário
    let title = document.getElementById("title-create").value;
    let amount = document.getElementById("amount-create").value;
    let description = document.getElementById("description-create").value;
    let startDate = document.getElementById("start-date-create").value;
    let endDate = document.getElementById("end-date-create").value;
    let stats = document.getElementById("stats-create").value;

    if (new Date(endDate) - new Date(startDate) < 0) {
        toastError("Data inválida")
        return
    }
    
    console.log('aqui dps')
    // Verifique se todos os campos estão preenchidos
    if (!title || !amount || !description || !startDate || !endDate || !stats) {
        toastError("Por favor, preencha todos os campos!");
        return;
    }

    createGoal()
})