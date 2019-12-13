
  // Carrega O BI DA EMPRESA LOGADA
  
function dashboard(){
 
  const bi = window.sessionStorage.getItem("bi")
  

  document.getElementById("frame").src = ""+bi+"";

}
dashboard()