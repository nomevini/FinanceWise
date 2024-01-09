const Modal = {
    open(transactionType, modalClass) {
        const modal = document.querySelector(`.${modalClass}`)
        const modalTitle = document.querySelector("#modal-title")
        
        if(transactionType == 'filtrar' ){
            modalTitle.innerText = `${capitalizeFirstLetter(transactionType)}`
            modalTitle.type = transactionType
        }else if(transactionType == 'editar'){
            const modalTitle = document.querySelector("#modal-title-edit")
            modalTitle.innerText = `${capitalizeFirstLetter(transactionType)}`
            modalTitle.type = transactionType
        } else {
            modalTitle.innerText = `Nova ${capitalizeFirstLetter(transactionType)}`
            modalTitle.type = transactionType
        }

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