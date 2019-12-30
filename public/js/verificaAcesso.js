  // FUNCAO LIMPA SESSAO DO USUARIO 
async function deslogar(){
  
  sessionStorage.clear()
  localStorage.clear()
  verificaAcesso()
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
  // CARREGA OS DADOS DA EMPRESA CONFORME USER LOGADO E IM DO PERFIL
  document.body.style.backgroundImage = "url('/img/empresa/"+empresalow+"/logo.png')"
  linkPrincipal.text = empresa
  document.getElementById("imgLogin").src = user.url


  // CHECA SE TEM PERMISSAO PARA ACESSAR O CADASTRO
  
  if(user.admin == 1){
    
   menuCadastro.classList.remove("disabled")
   
  }
  
}
verificaAcesso()
