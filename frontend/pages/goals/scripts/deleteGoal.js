async function deleteGoal(goalId) {
    try {
        
        const token = sessionStorage.getItem('token')
      
        let response = await fetch(`http://localhost:3000/meta/${goalId}`, {
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json()
            throw new Error(response.message);
        }

        console.log("Dica deletada com sucesso")
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

const deleteButton = document.getElementById('modal-delete-button')
deleteButton.addEventListener('click', function(e) {
    e.preventDefault()

    const id = document.getElementById('title-detail').getAttribute('goal-id');
    deleteGoal(id)
})