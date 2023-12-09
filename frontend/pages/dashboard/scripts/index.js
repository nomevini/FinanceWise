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

const DOM = {
    transactionsContainer: document.querySelector("#data-table tbody"),
    addTransaction(transactions, index) {
        const tr = document.createElement("tr")
        tr.innerHTML = DOM.innerHTMLTransaction(transactions, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transactions, index) {
        const CSSclass = transactions.amount > 0 ? "income":"expense"
        const amount = Utils.formatCurrency(transactions.amount)
        let statusColor = "Finished";
        if (transactions.stats.toUpperCase().trim() === "FINALIZADO" || transactions.stats.toUpperCase().trim() === "FINALIZADA") {
            statusColor = "Finished";
        } else if (transactions.stats.toUpperCase().trim() === "PENDENTE") {
            statusColor = "Pendence";
        } else if (transactions.stats.toUpperCase().trim() === "CANCELADO" || transactions.stats.toUpperCase().trim() === "CANCELADA") {
            statusColor = "Canceled";
        } 

        const newHTML = `
        <tr class="TransactionLine">
            <th class="description">${transactions.description}</th>
            <th class="${CSSclass} money">${amount}</th>
            <th class="category">${transactions.category}</th>
            <th class="paymentMethod">${transactions.paymentMethod}</th>
            <th class="numberPayments">${transactions.numberPayments}</th>
            <th class="stats TransactionStatus ${statusColor}">${transactions.stats}</th>
            <th class="date">${transactions.date}</th>
            <th>
                <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" class="remove" alt="Remover Transação">
            </th>
        </tr>
        `;

        return newHTML
    },
    updateBalance() {
        document
            .querySelector("#incomeDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .querySelector("#expenseDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .querySelector("#totalDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },
    totalCardColor(){
        if (Transaction.total() < 0) {
            // - Negativo
            console.info("Seu Valor Total Esta Negativo: " + Utils.formatSimple(Transaction.total()))
            CardColor.negative()
        } else {
            // - Positivo
            console.info("Seu Valor Total Esta Positivo: " + Utils.formatSimple(Transaction.total()))
            CardColor.positive()
        }
    },
    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
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