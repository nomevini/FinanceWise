function updatePassword() {

    let email = document.getElementById("email");
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let error = document.getElementById('error-message');
  
    if (!regex.test(email.value)) {
        error.style.display = 'block';
        email.style.borderColor = '#ED3A5A';
    } else {
        error.style.display = 'none';
        email.style.borderColor = ' #E2E8F0'; 

        sendRequest()
    }
}

async function sendRequest(){

    let email = document.getElementById("email").value;
    const token = document.getElementById('Token').value;

    const user = 
    {
        senha: document.getElementById('password').value,
        email: email
    }

    try {
        let response = await fetch(`http://localhost:3000/atualizar-senha/${token}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const data = await response.json()

        console.log(data)

        // atualizar tela para o usuario voltar para tela de login

    } catch (error) {
        console.log(error)
    }    
}

function redirecToLogin() {
    window.location.href = '../login/index.html';
}
