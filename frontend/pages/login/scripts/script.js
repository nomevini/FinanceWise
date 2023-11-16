function handleEye(id1, id2) {
  var img1 = document.getElementById(id1);
  var img2 = document.getElementById(id2);

  img1.classList.add("d-none");
  img2.classList.remove("d-none");

  var input = document.getElementById('input-password');

  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

function validate() {
  var email = document.getElementById("email");
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var error = document.getElementById('error-message');

  if (!regex.test(email.value)) {
    error.style.display = 'block';
    email.style.borderColor = '#ED3A5A';
  } else {
    error.style.display = 'none';
    email.style.borderColor = ' #E2E8F0';
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