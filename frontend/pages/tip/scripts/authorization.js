function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
}


const token = sessionStorage.getItem('token')
const decodedToken = parseJwt(token);

// verificar se o token eh valido
const expirationTime = decodedToken.exp;
const currentTime = Math.floor(Date.now() / 1000);

if (expirationTime < currentTime) {
  // O token expirou
  window.location.href = '../notAuthorized/index.html';
}


// verificar se o usuario eh admin ou nao
if(!decodedToken.admin){
    const btnAddTip = document.querySelector('.dica')
    const btnSaveTip = document.querySelector('.save-tip')
    const btnDeleteTip = document.querySelector('.red')
    const divButtons = document.querySelector('.complete-tip')
    
    btnAddTip.style.display = 'none';
    btnSaveTip.style.display = 'none';
    btnDeleteTip.style.display = 'none';

    // Atribuindo as propriedades flex e justify-content
    divButtons.style.display = 'flex';
    divButtons.style.justifyContent = 'center';

    const textarea = document.getElementById('complete-description');
    const paragrafo = document.createElement('p');

    // Copia o ID e as classes do textarea para o parágrafo
    paragrafo.id = textarea.id;
    paragrafo.className = textarea.className;

    // Copia o texto do textarea para o parágrafo
    const texto = document.createTextNode(textarea.value);
    paragrafo.appendChild(texto);

    // Substitui o textarea pelo parágrafo
    textarea.parentNode.replaceChild(paragrafo, textarea);
}

export {parseJwt};