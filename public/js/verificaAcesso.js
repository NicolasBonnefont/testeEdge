  // FUNCAO LIMPA SESSAO DO USUARIO 
async function deslogar(){
  
  sessionStorage.clear()
  localStorage.clear()
  }

function verificaAcesso(){
  
  const sessao = window.sessionStorage.getItem("sessao")
  var caminhoEmpresa = window.sessionStorage.getItem("empresa")
  var empresa = window.sessionStorage.getItem("empresa")
  const linkPrincipal = document.getElementById('linkPrincipal')
  var menuCadastro = document.getElementById('menuCadastro')
  menuCadastro.classList.add("disabled")

  var data = sessionStorage.getItem("user")
  const user = JSON.parse(data)

  
    // VERIFICA SE ESTA LOGADO
  if (!sessao){
    // NAO LOGADO, REDIRECIONA PARA A TELA DE LOGIN
    window.location.replace("../#home");    
  }

  // colocado o caminho em lowercase para nao gerar problema com servidor online
  var empresalow = caminhoEmpresa.toLocaleLowerCase()
  document.body.style.backgroundImage = "url('/img/empresa/"+empresalow+"/logo.png')";
  linkPrincipal.text = empresa

  // CHECA SE TEM PERMISSAO PARA ACESSAR O CADASTRO
  console.log(user.admin)
  if(user.admin == 1){
    console.log('ok')
    menuCadastro.classList.remove("disabled")
  }
  
}
verificaAcesso()
