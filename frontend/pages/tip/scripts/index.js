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


// lançar toast de erro
function toastError(message = "ERRO!") {
    /*let a = document.querySelector("???").innerHTML = `
    <div id="toast">
    <div class="img">Icon</div>
    <div class="description">${message}</div>
    </div>`*/

    const toastId = document.querySelector("#toast")
    toastId.className = "show"

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
