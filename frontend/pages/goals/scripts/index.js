const Modal = {
  open(transactionType, modalClass) {

      const modal = document.querySelector(`.${modalClass}`)
      const modalTitle = document.querySelector("#modal-title")
      
      modalTitle.innerText = `${capitalizeFirstLetter(transactionType)}`

      modal.classList.add("active")
  },
  close(modalClass) {
        document.getElementById("goal-form").reset();

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

function formatStringDate(data) {
    var dia  = data.split("/")[0];
    var mes  = data.split("/")[1];
    var ano  = data.split("/")[2];
  
    return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}
  
const ModalDetalhes = {
    modalElement: document.querySelector('.modal-detalhes'),
    open(element) {    
        document.getElementById('title-detail').value = element.titulo
        document.getElementById('title-detail').setAttribute('goal-id', element.id)
        document.getElementById('amount-detail').value = element.valor
        document.getElementById('description-detail').value = element.descricao
        document.getElementById('start-date-detail').value = formatStringDate(element.dataInicio)
        document.getElementById('end-date-detail').value = formatStringDate(element.dataFinal)
        document.getElementById('stats-detail').value = element.status

        this.modalElement.classList.add('active');
    },
    close() {
        this.modalElement.classList.remove('active');
    }
};

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