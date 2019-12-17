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
  
   // colocado o caminho em lowercase para nao gerar problema com servido online
  var empresalow = caminhoEmpresa.toLocaleLowerCase()
  console.log(empresalow)
  
    // VERIFICA SE ESTA LOGADO
  if (!sessao){
    // NAO LOGADO, REDIRECIONA PARA A TELA DE LOGIN
    window.location.replace("../home");    
  }
 
  document.body.style.backgroundImage = "url('/img/empresa/"+empresalow+"/logo.png')";
  linkPrincipal.text = empresa
  
  
}
verificaAcesso()
