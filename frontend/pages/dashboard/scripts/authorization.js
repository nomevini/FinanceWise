export function parseJwt(token) {
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