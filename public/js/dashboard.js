
  // Carrega O BI DA EMPRESA LOGADA
  
async function dashboard(){
 
  await axios.get('../acesso', config)
    .then(function (response) {
      document.getElementById("frame").src = ""+response.data.empresas.bi+"";
      console.log(response.data.empresas.bi)
    })
    .catch(function (err) {
      console.log(err)
      deslogar()
    })
    

}
dashboard()