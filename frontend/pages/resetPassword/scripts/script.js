function resetPassword() {

    let email = document.getElementById("email");
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let error = document.getElementById('error-message');
  
    if (!regex.test(email.value)) {
        error.style.display = 'block';
        email.style.borderColor = '#ED3A5A';
    } else {
        error.style.display = 'none';
        email.style.borderColor = ' #E2E8F0';

        sendEmail(email.value)    
    }
}

async function sendEmail(email){

    const data = {
        email: email
    }

    try {
        let response = await fetch('http://localhost:3000/recuperar-senha', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // redirecionar para a tela de atualizar senha 
        window.location.href = '../updatePassword/index.html'; 

    } catch (error) {
        console.log(error)
    }
}

function redirecToLogin() {
    window.location.href = '../login/index.html'; // Substitua com o URL desejado
}
