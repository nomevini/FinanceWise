import {data, getTransactions} from './transaction.js'

let paginaAtual = 1;

function atualizarPaginacao() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPaginas = data.totalPaginas;
    const numerosPaginas = 3;

    const inicio = Math.max(1, paginaAtual - Math.floor(numerosPaginas / 2));
    const fim = Math.min(totalPaginas, inicio + numerosPaginas - 1);

    for (let i = inicio; i <= fim; i++) {
    const link = document.createElement('a');
    link.href = '#';
    link.classList.add('page-link');
    if (i === paginaAtual) {
        link.classList.add('nav-link');
        link.classList.remove('page-link');
    }

    link.innerText = i;
    link.onclick = function() {
        selecionarPagina(i);
        return false; // Evita que a página seja recarregada
    };

    pagination.appendChild(link);
    }
}

function selecionarPagina(numeroPagina) {
    paginaAtual = numeroPagina;
    atualizarPaginacao();
    getTransactions({pagina:numeroPagina, itensPorPagina:7})
    scrollToTop();
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

atualizarPaginacao();