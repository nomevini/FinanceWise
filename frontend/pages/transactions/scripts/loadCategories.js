import { toastError } from "./toastError.js"
import { parseJwt } from "./authorization.js";
import { deletarCategoria } from "./category.js";

async function loadTipCategories() {

    const token = sessionStorage.getItem('token')
    const decodedToken = parseJwt(token);

    try {
        let response = await fetch(`http://localhost:3000/categoria-sistema/${decodedToken.userId}`, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        });
 
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error);
        }
        
        // adicionar as categorias no select na interface
        
        let defaultCategories = await response.json()
        let userCategories = undefined

        if (!decodedToken.admin) {
            // usuario comum
            // carregar suas categorias
            let response = await fetch(`http://localhost:3000/categoria-usuario/${decodedToken.userId}`, {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
            });

            userCategories = await response.json()  
            insertCategoriesOnSelect(userCategories)
            insertCategoriesOnSelect(defaultCategories)
            insertCategoriesOnMyCategories(userCategories)

            const categories = defaultCategories.concat(userCategories)
            sessionStorage.setItem('categories', JSON.stringify(categories));
            
        }else {
            sessionStorage.setItem('categories', JSON.stringify(defaultCategories));
            insertCategoriesOnSelect(defaultCategories)
            insertCategoriesOnMyCategories(defaultCategories)
        }

    } catch (error) {
        console.error(error);
        toastError(error.message)
    }
}

loadTipCategories()

function insertCategoriesOnSelect(categories){
    categories.forEach(categoria => {

        const selectElement = document.getElementById('category-transaction');
        const editSelectElement = document.getElementById('edit-category-transaction')
        const filterSelectElement = document.getElementById('filter-category-transaction')
          
        // inserir no select
        const option = document.createElement('option');
        option.text = categoria.nome;
        selectElement.appendChild(option);

        const option2 = document.createElement('option');
        option2.text = categoria.nome;
        editSelectElement.appendChild(option2);

        const option3 = document.createElement('option');
        option3.text = categoria.nome;
        filterSelectElement.appendChild(option3);
    });
}

function insertCategoriesOnMyCategories(categories){
    categories.forEach(categoria => {

        // inserir nas categorias já criadas
        const divCategories = document.querySelector(".categories")

        const divCategoria = document.createElement('div')
        divCategoria.className = 'input-group'
        divCategoria.id = 'delete-category'

        const nomeCategoria = document.createElement('p')
        nomeCategoria.innerHTML = categoria.nome

        const btnImg = document.createElement('img')
        btnImg.src = './assets/minus.svg'
        btnImg.alt = 'Deletar categoria'

        const btnDeleteCategoria = document.createElement('button')
        btnDeleteCategoria.addEventListener('click', deletarCategoria)
        btnDeleteCategoria.id = 'btn-deletar-categoria'
        btnDeleteCategoria.appendChild(btnImg)

        divCategoria.appendChild(nomeCategoria)
        divCategoria.appendChild(btnDeleteCategoria)

        divCategories.appendChild(divCategoria)
    });
}