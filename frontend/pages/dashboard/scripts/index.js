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


function toastError(message = "ERRO!") {
    const toastId = document.querySelector("#toast")

    toastId.className = "show"

    setTimeout(() => {
        toastId.className = toastId.className.replace("show", "")
    }, 5000)
}

document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector('.toggleButton');
    const valores = document.querySelectorAll('.money');
    let valoresEscondidos = false;

    toggleButton.addEventListener('click', function () {
        // Alterna entre mostrar os valores monetários e mostrar asteriscos
        valoresEscondidos = !valoresEscondidos;

        if (valoresEscondidos) {
            esconderValores();
        } else {
            mostrarValores();
        }

        // Verifica o caminho atual e troca para o oposto
        if (toggleButton.src.endsWith('eyeOpened.svg')) {
            toggleButton.src = './assets/eyeClosed.svg';
        } else if (toggleButton.src.endsWith('eyeClosed.svg')) {
            toggleButton.src = './assets/eyeOpened.svg';
        }
    });

    function esconderValores() {
        valores.forEach(valor => {
            // Salva o valor original em um atributo data
            valor.dataset.originalValue = valor.innerText;
            valor.innerText = 'R$ ***';
        });
    }

    function mostrarValores() {
        valores.forEach(valor => {
            // Restaura o valor original a partir do atributo data
            const originalValue = valor.dataset.originalValue;
            valor.innerText = originalValue;
        });
    }
});

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