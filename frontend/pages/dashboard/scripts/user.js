import {toastError} from './toastError.js'
import { parseJwt } from "./authorization.js";
import {CLIENT_ID} from "../../../IMGUR_CLIENT_ID.js"

const imageInput = document.getElementById('imagemInput')
imageInput.addEventListener("change", function(e) {
    const input = e.target;
    const imagem = input.files[0];

    if (imagem) {
      const leitor = new FileReader();

      leitor.onload = function(e) {
        const imgElement = new Image();
        imgElement.src = e.target.result;

        imgElement.onload = function() {
            if (imgElement.width != imgElement.height) {
                toastError('A imagem não atende os requisitos')
                imageInput.value = ''
            }
        };
      };

      leitor.readAsDataURL(imagem);
    }
})

const userForm = document.getElementById('user-informations')
userForm.addEventListener('submit', async function(e) {
  
  e.preventDefault()

  const nome = document.getElementById('username').value
  const sobrenome = document.getElementById('lastname').value
  const dataNascimento = document.getElementById('date').value
  const sexo = document.getElementById('genero').value
  const imagemPerfil = document.getElementById('imagemInput')
  let imageLink = null;

  const token = sessionStorage.getItem('token')
  const decodedToken = parseJwt(token);

  try {
    
    if (!nome) {
      toastError('O campo nome é obrigatório')
      return
    }

    if (!sobrenome) {
      toastError('O campo sobrenome é obrigatório')
      return
    }

    if (imagemPerfil.value) {
      // enviar imagem no imgur 

      const data = new FormData();
      data.append('image', imagemPerfil.files[0]);

      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Client-ID ${CLIENT_ID}`,
        }
      })

      const image = await response.json()
      
      imageLink = image.data.link
    }

    const user = {
      nome,
      sobrenome,
      dataNascimento,
      sexo,
      imagemPerfil: imageLink
    }

    // enviar para o banco de dados
    let response = await fetch(`http://localhost:3000/usuario/${decodedToken.userId}`, {
        method: 'PUT',
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(user)
    });

    response = await response.json()
    
    userForm.reset()
    location.reload()

  } catch (error) {
    console.log(error)
    toastError(error.message)
  }
})

async function loadUserInformations(){
  try {

    const token = sessionStorage.getItem('token')
    const decodedToken = parseJwt(token);

    let response = await fetch(`http://localhost:3000/usuario/${decodedToken.userId}`, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        }
    });

    response = await response.json()


    // inserir informacoes nos campos
    const {nome, sobrenome, sexo, dataNascimento, imagemPerfil} = response

    document.getElementById('username').value = nome
    document.getElementById('lastname').value = sobrenome

    const dataRecebida = new Date(dataNascimento);

    // Configurando o fuso horário para UTC
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' };
    const formatoData = new Intl.DateTimeFormat('pt-BR', options);

    const dataFormatada = formatoData.format(dataRecebida);

    document.getElementById('date').value = formatStringDate(dataFormatada)

    if (sexo) {
      const options = document.getElementById('genero').options

      for (let index = 0; index < options.length; index++) {
        if (options[index].value == sexo) {
          options.selectedIndex = index
        }
      }
    }

    if (imagemPerfil) {
      document.getElementById('userImage').src = imagemPerfil
    }

  } catch (error) {
    toastError(error.message)
  }
}

function formatStringDate(data) {
  var dia  = data.split("/")[0];
  var mes  = data.split("/")[1];
  var ano  = data.split("/")[2];

  return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
  // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}

await loadUserInformations()