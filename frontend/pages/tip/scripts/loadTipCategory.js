import { parseJwt } from "./authorization.js";

async function loadTipCategories() {

    const token = sessionStorage.getItem('token')
    const decodedToken = parseJwt(token);

    try {
        let response = await fetch(`http://localhost:3000/categoria/${decodedToken.userId}`, {
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
        const selectElement = document.getElementById('selectCategory');
        const categories = await response.json()

        categories.forEach(categoria => {
          const option = document.createElement('option');
          option.text = categoria.nome;
          selectElement.appendChild(option);
        });
         
    } catch (error) {
        console.error(error);
        toastError(error.message)
    }
}

async function loadTips({pagina=1,itensPorPagina=6}) {
    try {

        const token = sessionStorage.getItem('token')

        let response = await fetch(`http://localhost:3000/dicas?pagina=${pagina}&itensPorPagina=${itensPorPagina}`, {
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

        const data = await response.json()

        const mainContent = document.getElementById('main-content')

        mainContent.innerHTML = '';

        // carregar na interface
        data.dicas.forEach(dica => {
            const section = document.createElement('section');
            section.className = 'post';
            section.setAttribute('data-id', `${dica.id}`)
  
            const h2 = document.createElement('h2');
            h2.innerText = dica.titulo;
            h2.setAttribute('id', 'titulo');
  
            const categoria = document.createElement('p');
            categoria.className = 'category';
            categoria.innerText = `Categoria: ${dica.CategoriaTransacao.nome}`;
            categoria.setAttribute('id', 'categoria');
  
            const content = document.createElement('p');
            content.className = 'content';
            content.innerText = dica.descricao;
            content.setAttribute('id', 'descricao');
  
            section.appendChild(h2);
            section.appendChild(categoria);
            section.appendChild(content);
  
            mainContent.appendChild(section);

            section.onclick = function(){
                
                const tip = {
                    titulo: this.children[0].innerText,
                    categoria: this.children[1].innerText,
                    descricao: this.children[2].innerText,
                    id: dica.id
                }
                
                Modal.open('Dica', 'modal-dica-completa', tip)
            };
        });

        return data

    } catch (error) {
        console.error(error);
        toastError(error.message)
    }
}

const data = await loadTips({pagina:1,itensPorPagina:6})
console.log(data)
loadTipCategories()
export {data, loadTips};