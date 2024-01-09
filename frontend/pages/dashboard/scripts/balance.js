async function getBalance() {
    
    const token = sessionStorage.getItem('token')

    let response = await fetch(`http://localhost:3000/balanco`, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        }
    });

    const data = await response.json()
    const balance = data.balancoMensal

    console.log(balance)

    document.getElementById('incomeDisplay').innerHTML = `${formatarNumeroBrasileiro(balance.totalReceitas)}`
    document.getElementById('expenseDisplay').innerHTML = `${formatarNumeroBrasileiro(balance.totalDespesas)}`

    const balanceText = document.getElementById('totalDisplay') 
    balanceText.innerHTML = `${formatarNumeroBrasileiro(balance.balanco)}`
    const totalContainer = document.querySelector('.total')

    if (balance.balanco < 0) {
        totalContainer.style.backgroundColor = 'red'
    }else {
        totalContainer.style.backgroundColor = 'green'
    }
}

function formatarNumeroBrasileiro(valor) {
    // Verificar se o valor é um número
    if (typeof valor !== 'number') {
        return 'Formato inválido';
    }

    // Arredondar o número para duas casas decimais
    valor = valor.toFixed(2);

    // Separar parte inteira e decimal
    let [parteInteira, parteDecimal] = valor.split('.');

    // Adicionar ponto para milhares
    parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Formatando o resultado
    return `R$ ${parteInteira},${parteDecimal}`;
}

getBalance()