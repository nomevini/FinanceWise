const Modal = {
    open(transactionType, modalClass) {

        console.log(modalClass)
        const modal = document.querySelector(`.${modalClass}`)
        const modalTitle = document.querySelector("#modal-title")
        console.log(modal)

        if(transactionType == 'filtrar'){
            modalTitle.innerText = `${capitalizeFirstLetter(transactionType)}`
        }else {
            modalTitle.innerText = `Nova ${capitalizeFirstLetter(transactionType)}`
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


const CardColor = {
    positive() {
        document
            .querySelector(".card.total")
            .classList
            .remove("negative")
        document
            .querySelector(".card.total")
            .classList
            .add("positive")
    },
    negative() {
        document
            .querySelector(".card.total")
            .classList
            .remove("positive")
        document
            .querySelector(".card.total")
            .classList
            .add("negative")
    }
}


const Form = {
    description: document.querySelector("input#description"),
    amount: document.querySelector("input#amount"),
    category: document.querySelector("input#category"),
    paymentMethod: document.querySelector("input#paymentMethod"),
    stats: document.querySelector("input#stats"),
    numberPayments: document.querySelector("input#numberPayments"),
    date: document.querySelector("input#date"),
    getValues() {
        return {
            description: Form.description.value,
            amount:      Form.amount.value,
            category:    Form.category.value,
            paymentMethod: Form.paymentMethod.value,
            stats:       Form.stats.value,
            numberPayments: Form.numberPayments.value,
            date:        Form.date.value
        }
    },
    validateFields() {
        const {description, amount, category, paymentMethod, stats, numberPayments, date} = Form.getValues()

        if (description.trim() === "" || amount.trim() === "" || category.trim() === "" || paymentMethod.trim() === "" || stats.trim() === "" || numberPayments.trim() === "" || date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos!")
        }
    },
    formatValues() {
        let {description, amount, category, paymentMethod, stats, numberPayments, date} = Form.getValues()

        amount = Utils.formatAmount(amount)
        date   = Utils.formatDate(date)

        return {
            description,
            amount,
            category,
            paymentMethod,
            stats,
            numberPayments,
            date
        }
    },
    saveTransaction(transaction) {
        Transaction.add(transaction)
    },
    clearFields() {
        Form.description.value = ""
        Form.amount.value      = ""
        Form.category.value = ""
        Form.paymentMethod.value = ""
        Form.stats.value = ""
        Form.numberPayments.value = ""
        Form.date.value        = ""
    },
    submit(event) {
        event.preventDefault()

        try {
            Form.validateFields()                   // Verifica campos
            const transaction = Form.formatValues() // Formata valores
            Form.saveTransaction(transaction)       // Adiciona valores
            Form.clearFields()                      // Limpa campos

            Modal.close()                           // Fecha modal
        } catch (error) {
            console.warn(error.message)
            toastError(error.message)
            
        }
    }
}

function toastError(message = "ERRO!") {
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

