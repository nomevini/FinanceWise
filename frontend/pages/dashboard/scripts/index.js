const Modal = {
    open() {
        document
            .querySelector(".modal-overlay")
            .classList
            .add("active")
    },
    close() {
        document
            .querySelector(".modal-overlay")
            .classList
            .remove("active")
    }
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

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },
    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

const Transaction = {
    all: Storage.get(),
    add(transaction) {
        Transaction.all.push(transaction);

        App.reload()
    },
    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },
    incomes() { // Somar entradas
        let income = 0

        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount
            }
        })
        return income
    },
    expenses() { // Somar saídas
        let expense = 0

        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount
            }
        })
        return expense
    },
    total() { // Entradas menos saídas
        return Transaction.incomes() + Transaction.expenses()
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
        
        /*const html = `
        <td class="description">${transactions.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="category">${transactions.category}</td>
        <td class="paymentMethod">${transactions.paymentMethod}</td>
        <td class="numberPayments">${transactions.numberPayments}</td>  
        <td class="stats">${transactions.stats}</td>
        <td class="date">${transactions.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" class="remove" alt="Remover Transação">
        </td>
        `;*/

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

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-&nbsp;" : "+&nbsp;"

        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })

        return signal + value
    },
    formatAmount(value) {
        value = value * 100
        return Math.round(value)
    },
    formatSimple(value){
        const signal = Number(value) < 0 ? "- " : "+ "

        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })

        return signal + value
    },
    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
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
            //alert(error.message)
        }
    }
}

const App = {
    init() {
        /* Transaction.all.forEach((transactions, index) => {
            DOM.addTransaction(transactions, index)
        })
         ou ↓ */
        Transaction.all.forEach(DOM.addTransaction)

        DOM.updateBalance()  // Atualiza o valor dos cards
        DOM.totalCardColor() // Atualiza a cor do card 'total'

        Storage.set(Transaction.all)
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    }
}
App.init()


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
