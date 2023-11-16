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

    let form = document.querySelector('.login-wrapper');
    let emailSent = document.querySelector('.email-sent');

    // Oculte o formulário
    form.style.display = 'none';

    // envie para o backend e espera o retorno

    // caso tenha dado certo, imprima a mensagem na tela

    // Exiba a mensagem de envio
    emailSent.style.display = 'flex';
  }
}

function redirecToLogin() {
  window.location.href = '../login/index.html'; // Substitua com o URL desejado
}
