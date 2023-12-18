async function loadGoals({pagina=1,itensPorPagina=6}) {

    const token = sessionStorage.getItem('token')

    try {
        let response = await fetch(`http://localhost:3000/metas?pagina=${pagina}&itensPorPagina=${itensPorPagina}`, {
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

        // adicionar as metas na interface

        const data = await response.json()
        const table = document.getElementById('table-body')

        data.metas.forEach(meta => {
            const goal = document.createElement('tr');
            goal.setAttribute('id', `${meta.id}`)
            goal.setAttribute('onclick', `console.log("cliquei")`)

            const title = document.createElement('td');
            title.innerHTML = meta.titulo
            goal.appendChild(title)

            const value = document.createElement('td');
            value.innerHTML = meta.valor
            goal.appendChild(value)

            const description = document.createElement('td');
            description.innerHTML = meta.descricao
            goal.appendChild(description)

            const startDate = document.createElement('td');
            startDate.innerHTML = new Date(meta.dataInicio).toLocaleDateString()
            goal.appendChild(startDate)
            
            const endDate = document.createElement('td');
            endDate.innerHTML = new Date(meta.dataFinal).toLocaleDateString()
            goal.appendChild(endDate)

            const stats = document.createElement('td');
            stats.innerHTML = meta.status
            goal.appendChild(stats)

            goal.onclick = function(){
                
                const goal = {
                    id: meta.id,
                    titulo: this.children[0].innerText,
                    valor: this.children[1].innerText,
                    descricao: this.children[2].innerText,
                    dataInicio: this.children[3].innerText,
                    dataFinal: this.children[4].innerText,
                    status: this.children[5].innerText,
                }
                
                ModalDetalhes.open(goal)
            };
            
            table.appendChild(goal)
        }); 

        return data
         
    } catch (error) {
        console.error(error);
        toastError(error.message)
    }
}

const data = await loadGoals({pagina:1,itensPorPagina:6})

export {data, loadGoals}