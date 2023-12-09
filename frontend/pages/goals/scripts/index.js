const Modal = {
  open(transactionType, modalClass) {

      const modal = document.querySelector(`.${modalClass}`)
      const modalTitle = document.querySelector("#modal-title")
      
      modalTitle.innerText = `${capitalizeFirstLetter(transactionType)}`

      modal.classList.add("active")
  },
  close(modalClass) {
      document
          .querySelector(`.${modalClass}`)
          .classList
          .remove("active")
  }
}

function capitalizeFirstLetter(string) {
  let arrayString = string.split('')
  let firstLetter = arrayString[0].toUpperCase()
  let remaining = arrayString.slice(1, arrayString.length)
  return firstLetter + remaining.join('')
}

const ModalDetalhes = {
    modalElement: document.querySelector('.modal-detalhes'),
    open() {
      this.modalElement.classList.add('active');
    },
    close() {
      this.modalElement.classList.remove('active');
    }
};

// Função para adicionar uma meta à tabela
function addGoal(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtenha os valores do formulário
    var title = document.getElementById("title").value;
    var amount = document.getElementById("amount").value;
    var description = document.getElementById("description").value;
    var startDate = document.getElementById("start-date").value;
    var endDate = document.getElementById("end-date").value;
    var status = document.getElementById("stats").value;

    // Verifique se todos os campos estão preenchidos
    if (!title || !amount || !description || !startDate || !endDate || !status) {
        showToast("Por favor, preencha todos os campos!");
        return;
    }

    // Crie uma nova linha na tabela
    var table = document.getElementById("data-table").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);

    // Adicione as células com os valores do formulário
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);

    cell1.innerHTML = title;
    cell2.innerHTML = amount;
    cell3.innerHTML = description;
    cell4.innerHTML = startDate;
    cell5.innerHTML = endDate;
    cell6.innerHTML = status;

    // Feche o modal
    Modal.close();

    // Limpe o formulário
    document.getElementById("goal-form").reset();
}

// Função para exibir um toast
function showToast(message) {
    var toast = document.getElementById("toast");
    toast.getElementsByClassName("description")[0].innerHTML = message;
    toast.style.display = "flex";
    setTimeout(function () {
        toast.style.display = "none";
    }, 3000); // Oculta o toast após 3 segundos
}

/* Abrir o menu de sanduíche */
document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.getElementById('menu-icon');
  const navbar = document.getElementById('navbar');

  menuIcon.addEventListener('click', function () {
    navbar.classList.toggle('show');
  });
});

function logout(){
  window.location.href = '../notAuthorized/index.html';
}