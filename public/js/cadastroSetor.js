async function carregaEmpresa() {
  var dados

  await axios.get('/empresas', config)
    .then(function (response) {
      dados = response.data.data
    })
    .catch(function (error) {})

  for (var i = 0; i < dados.length; i++) {
    var SelectEmpresa = document.getElementById("SelectEmpresa")
    var option = document.createElement("option")
    option.text = dados[i].empresa;
    SelectEmpresa.add(option);
  }
  for (var i = 0; i < dados.length; i++) {
    var SelectEmpresaAltera = document.getElementById("SelectEmpresaAltera")
    var option = document.createElement("option")
    option.text = dados[i].empresa;
    SelectEmpresaAltera.add(option);
  }
}
carregaEmpresa()

async function carregaSetor(){

  document.querySelectorAll('#SelectSetor option').forEach(option => option.remove())
  
  var x = document.getElementById("SelectEmpresaAltera").selectedIndex;
  var y = document.getElementById("SelectEmpresaAltera").options;
  var empresaBusca = y[x].text
  var idEmpresa

  await axios.post('/empresas', {"empresa": empresaBusca}, config)
  .then(function(response){
    idEmpresa = response.data.id
    sessionStorage.setItem('idEmpresa', idEmpresa)
  })

  await axios.get('/setor/empresa/'+idEmpresa, config)
  .then(function(response){  
    document.querySelectorAll('#SelectSetor option').forEach(option => option.remove())
 
    for (var i = 0; i < response.data.length; i++) {
      var SelectSetor = document.getElementById("SelectSetor")
      var option = document.createElement("option")
      option.text = response.data[i].descricao;
      SelectSetor.add(option);
    }
  })
   igualaSetor()
}

async function igualaSetor(){
 
  document.getElementById('descricaoAltera').value = ''
  var a = document.getElementById("SelectEmpresaAltera").selectedIndex;
  var b= document.getElementById("SelectEmpresaAltera").options;
  var empresa = b[a].text

  var c = document.getElementById("SelectSetor").selectedIndex;
  var d= document.getElementById("SelectSetor").options;
  var setor = d[c].text

  await axios.post('/setorDescricao', 
  {
    'idEmpresa': sessionStorage.getItem('idEmpresa'),
    'descricao': setor
  }, config)

  .then(function(response){ 
      document.getElementById('descricaoAltera').value = response.data[0].descricao      
      document.getElementById('campos').disabled = false
      sessionStorage.setItem('idPainel', response.data[0].id)
       
  })
  .catch(function(err){
    console.log(err)
    
  })

}

async function gravaSetor(){
  event.preventDefault()

  var x = document.getElementById("SelectEmpresa").selectedIndex;
  var y = document.getElementById("SelectEmpresa").options;
  var empresaBusca = y[x].text
  var idEmpresa

  await axios.post('/empresas', {"empresa": empresaBusca}, config)
  .then(function(response){
    idEmpresa = response.data.id
  })

  await axios.post('/setor',
  {
    "idEmpresa": idEmpresa,
    "descricao": document.getElementById('descricao').value
  }, config)
  .then(function(response){
    alert('Setor cadastrado com sucesso !')
    location.reload()
  })
  .catch(function(err){
    console.log(err)
    alert('Problema no cadastro, verificar log !')
  })
}

async function alteraSetor(){
  event.preventDefault()
  await axios.put('/setor/' + sessionStorage.getItem('idPainel'),
  {
    "idEmpresa": sessionStorage.getItem('idEmpresa'),
    "descricao" : document.getElementById('descricaoAltera').value
  }, config)
  .then(function(response){
    alert('Setor aterado com sucesso !')    
    limparCampos()
  })
  .catch(function(err){
    console.log(err)
    alert('Erro na alteração, verificar log')
  }) 
}

async function excluirSetor(){
  event.preventDefault()

  await axios.delete('/setor/' + sessionStorage.getItem('idPainel'), config)
  .then(function(response){
    alert('Setor Excluido com sucesso')
    limparCampos()
  })
  .catch(function(err){
    console.log(err)
    alert('Problema na exclusão, verificar log')

  })
} 

function limparCampos(){
  const campos = document.getElementById('campos')
  campos.disabled = true
  document.getElementById("formAltera").reset();
  document.getElementById("form").reset();
  sessionStorage.setItem('idEmpresa', '')
  sessionStorage.setItem('idPainel', '')
  sessionStorage.setItem('id', '')
  sessionStorage.setItem('descricaoPainel', '')
  document.querySelectorAll('#SelectSetor option').forEach(option => option.remove())

}