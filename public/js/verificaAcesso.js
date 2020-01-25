// CONFIG PARA ENVIAR DADOS DO TIPO ARQUIVO COM TOKEN
const token = sessionStorage.getItem('sessao')
const sessao = token
const configMultipart = {
  headers: {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'multipart/form-data'
  }
}
// CONFIG PARA ENVIAR DADOS COM TOKEN
const config = {
  headers: {
    Authorization: 'Bearer ' + token
  }
}
async function verificaAcesso() {
  // VERIFICA A INTEGRIDADE DO TOKEN
  await axios.get('../acesso', config)
    .then(function (response) {

    })
    .catch(function (err) {
      sessionStorage.clear()
      localStorage.clear()
      window.location.replace("../home");
    })

  var empresa = window.sessionStorage.getItem("empresa")
  const linkPrincipal = document.getElementById('linkPrincipal')
  var habilitaMenuCadastro = document.getElementById('habilitaMenuCadastro')
  var data = sessionStorage.getItem("user")
  const user = JSON.parse(data)

  // CHECA SE TEM PERMISSAO PARA ACESSAR O CADASTRO
  if (!user.admin == 1) {
    habilitaMenuCadastro.remove()
  }

  // CARREGA OS DADOS DA EMPRESA CONFORME USER LOGADO E IM DO PERFIL
  document.body.style.backgroundImage = "url(" + sessionStorage.getItem("empresaUrl") + ")"
  linkPrincipal.text = empresa
  document.getElementById("imgLogin").src = user.url

}
async function deslogar() {
  sessionStorage.clear()
  localStorage.clear()
  window.location.replace("../home");
}
verificaAcesso()
