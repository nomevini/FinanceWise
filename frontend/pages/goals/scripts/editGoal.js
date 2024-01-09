import { parseJwt } from "./authorization.js";

// Função para adicionar uma meta à tabela
async function editGoal(goalId) {
    try {
        
        const token = sessionStorage.getItem('token')
        const decodedToken = parseJwt(token)
  
        const goal = {
            titulo: document.getElementById("title-detail").value,
            valor: document.getElementById("amount-detail").value,
            descricao: document.getElementById("description-detail").value,
            dataInicio: document.getElementById("start-date-detail").value,
            dataFinal: document.getElementById("end-date-detail").value,
            status: document.getElementById("stats-detail").value,
            usuarioId: decodedToken.userId
        }

        console.log(goal.status)

        let response = await fetch(`http://localhost:3000/meta/${goalId}`, {
            method: 'PUT',
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

        console.log("Dica editada com sucesso")
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

const createGoalButton = document.querySelector('.save-button')
createGoalButton.addEventListener('click', function(event){
    event.preventDefault()

    // Obtenha os valores do formulário
    let title = document.getElementById("title-detail").value;
    let amount = document.getElementById("amount-detail").value;
    let description = document.getElementById("description-detail").value;
    let startDate = document.getElementById("start-date-detail").value;
    let endDate = document.getElementById("end-date-detail").value;
    let stats = document.getElementById("stats-detail").value;

    // Verifique se todos os campos estão preenchidos
    if (!title || !amount || !description || !startDate || !endDate || !stats) {
        showToast("Por favor, preencha todos os campos!");
        return;
    }

    const id = document.getElementById("title-detail").getAttribute('goal-id');
    editGoal(id)

})