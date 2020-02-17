// CONFIG PARA ENVIAR DADOS DO TIPO ARQUIVO COM TOKEN

const configMultipart = {
  headers: {
    Authorization: 'Bearer ' + sessionStorage.getItem('sessao'),
    'Content-Type': 'multipart/form-data'
  }
}
// CONFIG PARA ENVIAR DADOS COM TOKEN
const config = {
  headers: {
    Authorization: 'Bearer ' + sessionStorage.getItem('sessao')
  }
}


async function verificaAcesso() {

  // esta rota, carrega os dados do usuario logado e a empresa na qual o mesmo faz parte
  await axios.get('../acesso', config)
    .then(function (response) {
      document.body.style.backgroundImage = "url(" + response.data.usuario.url + ")"
      document.getElementById("imgLogin").src = response.data.usuario.url
      usuarioteste = response.data.usuario.username
      sessionStorage.setItem('principal', response.data.usuario.id)
  
      document.body.style.backgroundImage = "url('')"
      if (!(response.data.empresas === null)) {

       document.getElementById('linkPrincipal').src = response.data.empresas.url
       document.getElementById('linkPrincipal').style.backgroundImage = "url(" + response.data.empresas.url + ")"
      
      }

      // CHECA SE TEM PERMISSAO PARA ACESSAR O CADASTRO
      if (!response.data.usuario.admin == 1) {
        if(document.getElementById('habilitaMenuCadastro')){
        document.getElementById('habilitaMenuCadastro').remove()
        }
      }
    })
    .catch(function (err) {
      deslogar()
      console.log(err)
   
    })
}

 function deslogar() {
  sessionStorage.clear()
  localStorage.clear()
  window.location.replace("..");
}

verificaAcesso()
var token = sessionStorage.getItem('sessao')
