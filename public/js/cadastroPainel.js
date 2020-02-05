async function carregaEmpresa() {
  var dados

  await axios.get('/empresas', config)
    .then(function (response) {
      dados = response.data.data
    })
    .catch(function (error) { })

  for (var i = 0; i < dados.length; i++) {
    var SelectEmpresa = document.getElementById("SelectEmpresa")
    var option = document.createElement("option")
    option.text = dados[i].empresa;
    SelectEmpresa.add(option);
  }
}
async function carregaUsuario(){  
  var dados
 
  await axios.get('/users', config)
  .then(function(response){
     dados = response.data.data
  })
  .catch(function(error){
  })

  for (var i = 0; i < dados.length; i++) {
    var SelectUsuario = document.getElementById("SelectUsuario")
    var option = document.createElement("option")
    option.text = dados[i].username;
    SelectUsuario.add(option);
}
}

async function carregaEmpresaAltera() {
  var dados
 
  await axios.get('/empresas', config)
    .then(function (response) {
      dados = response.data.data
     
    })
    .catch(function (error) { })
   
  for (var i = 0; i < dados.length; i++) {
    var SelectEmpresaAltera = document.getElementById("SelectEmpresaAltera")
    var option = document.createElement("option")
    option.text = dados[i].empresa;
    SelectEmpresaAltera.add(option);
  }
}
carregaEmpresa()
carregaUsuario()
carregaEmpresaAltera()

async function carregaPainel(){

  var empresaBusca = null
  document.getElementById('descricaoAltera').value = ''
  document.getElementById('setorAltera').value = ''
  document.getElementById('linkPainelAltera').value = ''

  var x = document.getElementById("SelectEmpresaAltera").selectedIndex;
  var y = document.getElementById("SelectEmpresaAltera").options;
  empresaBusca = y[x].text
  var idEmpresa

  await axios.post('/empresas',{"empresa":empresaBusca}, config)
  .then(function(response){
    idEmpresa = response.data.id
     
  })
  .catch(function(error){
    
  })
   
  
  document.querySelectorAll('#SelectSetor option').forEach(option => option.remove())
  document.querySelectorAll('#SelectSetor option').innerText = 'Selecione o Setor'
  

  await axios.post('/painelEmpresa',{"idEmpresa":idEmpresa}, config)

  .then(function(response){

    for (var i = 0; i < response.data.length; i++) {
      var SelectSetor = document.getElementById("SelectSetor")
      var option = document.createElement("option")     
      option.text = response.data[i].Descricao;
      SelectSetor.add(option);
    }

   window.sessionStorage.setItem('idEmpresa', idEmpresa)
    
  })
  .catch(function(error){
    document.querySelectorAll('#SelectSetor option').forEach(option => option.remove())
    document.querySelectorAll('#SelectSetor option').innerText = 'Selecione o Setor'
  })


}

 async function igualaPainel(){
  event.preventDefault()
  SelectEmpresaAltera
  var a = document.getElementById("SelectSetor").selectedIndex;
  var b = document.getElementById("SelectSetor").options;
  var setorBusca = b[a].text

  document.getElementById('descricaoAltera').value = ''
  document.getElementById('setorAltera').value = ''
  document.getElementById('linkPainelAltera').value = ''

  await axios.post('/painelCarrega', {"idEmpresa":sessionStorage.getItem('idEmpresa'),
  "descricao":setorBusca}, config)

  .then(function(response){
    
    document.getElementById('campos').disabled = false
    document.getElementById('descricaoAltera').value = response.data[0].Descricao
    document.getElementById('setorAltera').value = response.data[0].Setor
    document.getElementById('linkPainelAltera').value = response.data[0].Link
    sessionStorage.setItem('idPainel',  response.data[0].id)
    
  })
  .catch(function(error){

})
}


async function alterarPainel(){

await axios.put('/painelAltera',
{
  "id":sessionStorage.getItem('idPainel'),
  "Descricao": document.getElementById('descricaoAltera').value,
  "Setor": document.getElementById('setorAltera').value,
  "Link": document.getElementById('linkPainelAltera').value 
}, config)

.then(function(response){
  alert('Alterado com sucesso')
  limparCampos()

})
.catch(function(error){
  console.log(error)
  alert('Problema na alteração')
})




}

function limparCampos() {
  const campos = document.getElementById('campos')
  campos.disabled = true
  document.getElementById("formAltera").reset();
  document.getElementById("form").reset();

}

async function gravarPainel(){
  event.preventDefault()
  var x = document.getElementById("SelectEmpresa").selectedIndex;
  var y = document.getElementById("SelectEmpresa").options;
  empresaBusca = y[x].text
  
  await axios.post('/empresas',{"empresa":empresaBusca}, config)
  .then(function(response){
    sessionStorage.setItem('idEmpresa',  response.data.id)      
  })
  .catch(function(error){    
  })
  
  await axios.post('/painel',
  {
    "idEmpresa": sessionStorage.getItem('idEmpresa'),
    "Setor": document.getElementById('setor').value,
    "Descricao": document.getElementById('descricao').value,
    "Link": document.getElementById('linkPainel').value

  },config
  )
  .then(function(response){
    alert("Painel cadastrao com sucesso !")
   location.reload()
  })
  .catch(function(erro){
    console.log(erro)
    alert("Problema no cadastro !")
  })
}

