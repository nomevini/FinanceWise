function handleEye(id1, id2, password) {
  var img1 = document.getElementById(id1);
  var img2 = document.getElementById(id2);

  img1.classList.add("d-none");
  img2.classList.remove("d-none");

  var input = document.getElementById(`${password}`);

  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

function validate(idEmailInput, idErrorMessage) {

    var email = document.getElementById(`${idEmailInput}`);
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var error = document.getElementById(`${idErrorMessage}`);

    if (!regex.test(email.value)) {
        error.style.display = 'block';
        email.style.borderColor = '#ED3A5A';
        return false;
    } else {
        error.style.display = 'none';
        email.style.borderColor = ' #E2E8F0';
        return true;
    }
}

// Função para mostrar o formulário de cadastro e ocultar o de login
function showSignupForm() {
  
  document.querySelector('.login-form').style.display = 'none';
  document.querySelector('.signup-form').style.display = 'flex';

  let signupHeader = document.querySelector('.login-header');

  // Verifica se o elemento foi encontrado
  if (signupHeader) {
      // Altera o conteúdo conforme necessário
      signupHeader.innerHTML = `
          <h1>Registre-se na plataforma</h1>
          <p>Crie uma nova conta para começar a gerenciar suas finanças pessoais.</p>
      `;
  }

}

// Função para mostrar o formulário de login e ocultar o de cadastro
function showLoginForm() {
  document.querySelector('.login-form').style.display = 'flex';
  document.querySelector('.signup-form').style.display = 'none';

  let signupHeader = document.querySelector('.login-header');

  // Verifica se o elemento foi encontrado
  if (signupHeader) {
      // Altera o conteúdo conforme necessário
      signupHeader.innerHTML = `
        <h1>Acesse a plataforma</h1>
        <p>Faça login ou registre-se para começar a construir seus projetos ainda hoje.</p>  
      `;
  }
}

async function registerUser(admin=undefined) {
    // capturar os dados do form
    const user = {
        nome: document.getElementById('name').value,
        sobrenome: document.getElementById('lastname').value,
        dataNascimento: document.getElementById('date').value,
        email: document.getElementById('signup-email').value,
        senha: document.getElementById('signup-password').value
    }

    if(!admin){
        admin = false
    }

    user.admin = admin

    try {
        let response = await fetch('http://localhost:3000/usuario', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error);
        }

        window.location.href = '../successRegister/index.html';
        
    } catch (error) {
        console.error('Erro no cadastro de usuário:', error);
        toastError(error.message)
    }
}

let registerForm = document.querySelector(".signup-form")
registerForm.addEventListener('submit', function (event) {

    event.preventDefault();

    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const date = document.getElementById('date').value;
    const password = document.getElementById('signup-password').value;

    if (!name || !lastname || !date || !password) {
        // trocar pelo toast erros presente no dashboard
        alert('Por favor, preencha todos os campos obrigatórios.');
        return false;
    }

    // Chama a função de validação ao enviar o formulario
    if(validate('signup-email', 'signup-error-message')) {
        // registrar usuario
        registerUser()
    }
});

let loginForm = document.querySelector(".login-form")
loginForm.addEventListener('submit', function (event) {

  event.preventDefault();

  // Chama a função de validação ao enviar o formulario
  if(validate('login-email', 'login-error-message')) {
    // registrar usuario
    loginUser()
  }
});


async function loginUser() {
    const user = {
        email: document.getElementById('login-email').value,
        senha: document.getElementById('input-password').value
    }

    try {
        let response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        let data = await response.json();

        if(response.status == 401){
            throw new Error(data.error)
        }
        
        console.log('Usuário logado com sucesso:', data);

        // armazenar o token no sessionStorage
        sessionStorage.setItem('token', data.token);

        window.location.href = '../dashboard/index.html'

    } catch (error) {
        console.error('Erro no login do usuário:', error.message);
        toastError(error.message)
    }
}

function toastError(message = "ERRO!") {
    const toastId = document.querySelector("#toast")
    const toastText = document.querySelector('.description')

    toastText.innerText = message
    toastId.className = "show"

    setTimeout(() => {
        toastId.className = toastId.className.replace("show", "")
    }, 5000)
}
