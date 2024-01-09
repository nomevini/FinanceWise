import { toastError } from "./toastError.js"
import { parseJwt } from "./authorization.js";

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

            const categories = defaultCategories.concat(userCategories)
            sessionStorage.setItem('categories', JSON.stringify(categories));
            
        }else {
            sessionStorage.setItem('categories', JSON.stringify(defaultCategories));
            insertCategoriesOnSelect(defaultCategories)
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
    });
}
