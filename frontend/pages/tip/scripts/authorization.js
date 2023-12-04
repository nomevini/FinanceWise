function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
}

// verificar se o usuario eh admin ou nao
const token = sessionStorage.getItem('token')
const decodedToken = parseJwt(token);

console.log(token)

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

}