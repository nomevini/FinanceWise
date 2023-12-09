const Modal = {
    open(transactionType, modalClass, tip) {

        const modal = document.querySelector(`.${modalClass}`)
        const modalTitle = document.querySelector("#modal-title")
        
        modalTitle.innerText = `${capitalizeFirstLetter(transactionType)}`

        modal.classList.add("active")

        if (modalClass == 'modal-dica-completa') {
            document.getElementById('modal-titulo').innerHTML = tip.titulo
            document.getElementById('modal-titulo').setAttribute('data-id', `${tip.id}`)
            document.getElementById('modal-categoria').innerHTML = tip.categoria
            document.getElementById('complete-description').innerText = tip.descricao                
        }
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

function toastError(message = "ERRO!") {

    const toastId = document.querySelector("#toast")
    const toastText = document.querySelector("#description-toast")
    toastId.className = "show"
    toastText.innerText = message

    setTimeout(() => {
        toastId.className = toastId.className.replace("show", "")
    }, 5000)
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