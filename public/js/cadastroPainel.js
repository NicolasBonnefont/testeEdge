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
}
async function carregaSetor(){

  document.querySelectorAll('#SelectSetor option').forEach(option => option.remove())
  
  var x = document.getElementById("SelectEmpresa").selectedIndex;
  var y = document.getElementById("SelectEmpresa").options;
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

  var a = document.getElementById("SelectSetor").selectedIndex;
  var b = document.getElementById("SelectSetor").options;
  var setor = b[a].text

  await axios.post('/setorDescricao', 
  {
    'idEmpresa': sessionStorage.getItem('idEmpresa'),
    'descricao': setor
  }, config)

  .then(function(response){ 
      sessionStorage.setItem('idSetor', response.data[0].id)
      sessionStorage.setItem('descricaoSetor', response.data[0].descricao)       
  })
  .catch(function(err){
    console.log(err)
    
  })
  
}

async function carregaEmpresaAltera() {
  var dados

  await axios.get('/empresas', config)
    .then(function (response) {
      dados = response.data.data

    })
    .catch(function (error) {})

  for (var i = 0; i < dados.length; i++) {
    var SelectEmpresaAltera = document.getElementById("SelectEmpresaAltera")
    var option = document.createElement("option")
    option.text = dados[i].empresa;
    SelectEmpresaAltera.add(option);
  }
}

async function carregaPainel() {
  document.querySelectorAll('#selectPainel option').forEach(option => option.remove())
  var empresaBusca = null
  document.getElementById('descricaoAltera').value = ''
  document.getElementById('linkPainelAltera').value = ''

  var x = document.getElementById("SelectEmpresaAltera").selectedIndex;
  var y = document.getElementById("SelectEmpresaAltera").options;
  empresaBusca = y[x].text
  var idEmpresa

  await axios.post('/empresas', {
      "empresa": empresaBusca
    }, config)
    .then(function (response) {
      idEmpresa = response.data.id

    })
    .catch(function (error) {

    })

  await axios.get('/painelEmpresa/'+idEmpresa, config)
    .then(function (response) {
     
      if (response.data.data.length < 1) {
        
        alert('Empresa sem painel cadastrado !')
        limparCampos()
      }
      for (var i = 0; i < response.data.data.length; i++) {
        var selectPainel = document.getElementById("selectPainel")
        var option = document.createElement("option")
        option.text = response.data.data[i].Descricao;
        selectPainel.add(option);

      }
      window.sessionStorage.setItem('idEmpresa', idEmpresa)

    })
    .catch(function (error) {
      console.log(error)
      limparCampos()
      document.querySelectorAll('#selectPainel option').forEach(option => option.remove())
    })
    carregaSetorAltera()
}

async function igualaPainel() {
  event.preventDefault()
  


  if (sessionStorage.getItem('idEmpresa') < 1) {
    limparCampos()
  }
  var painelBusca = ''
  
  var a = document.getElementById("selectPainel").selectedIndex;
  var b = document.getElementById("selectPainel").options;
  painelBusca = b[a].text

  var c = document.getElementById("SelectSetorAltera").selectedIndex;
  var d = document.getElementById("SelectSetorAltera").options;
  
  
  document.getElementById('descricaoAltera').value = ''
  document.getElementById('linkPainelAltera').value = ''

  if (!(painelBusca == 'Selecione o Painel...')) {

    await axios.post('/carregaIdPainel', {
        "idEmpresa": sessionStorage.getItem('idEmpresa'),
        "descricao": painelBusca
      }, config)

      .then(function (response) {

        document.getElementById('campos').disabled = false
        document.getElementById('descricaoAltera').value = response.data[0].Descricao
        document.getElementById('linkPainelAltera').value = response.data[0].Link
        sessionStorage.setItem('idPainel', response.data[0].id)
        console.log(response.data[0].Setor)
        d[0].text = response.data[0].Setor
    
       
      })
      .catch(function (error) {

      })
  }
  
}
async function carregaSetorAltera(){

  document.querySelectorAll('#SelectSetorAltera option').forEach(option => option.remove())
  
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
    document.querySelectorAll('#SelectSetorAltera option').forEach(option => option.remove())
 
    for (var i = 0; i < response.data.length; i++) {
      var SelectSetor = document.getElementById("SelectSetorAltera")
      var option = document.createElement("option")
      option.text = response.data[i].descricao;
      SelectSetor.add(option);
    }
  })

}


async function alterarPainel() {
  var x = document.getElementById("SelectSetorAltera").selectedIndex;
  var y = document.getElementById("SelectSetorAltera").options;
  setor = y[x].text

  await axios.put('/painelAltera/'+ sessionStorage.getItem('idPainel'), {
      "idEmpresa": sessionStorage.getItem('idEmpresa'),      
      "Descricao": document.getElementById('descricaoAltera').value,
      "Setor": setor,
      "Link": document.getElementById('linkPainelAltera').value
    }, config)

    .then(function (response) {
      alert('Alterado com sucesso')
      limparCampos()
      location.reload()

    })
    .catch(function (error) {
      console.log(error)
    })

}

async function gravarPainel() {
  event.preventDefault()
  await igualaSetor()
  var x = document.getElementById("SelectEmpresa").selectedIndex;
  var y = document.getElementById("SelectEmpresa").options;
  empresaBusca = y[x].text

  await axios.post('/empresas', {
      "empresa": empresaBusca
    }, config)
    .then(function (response) {
      sessionStorage.setItem('idEmpresa', response.data.id)
    })
    .catch(function (error) {})

  await axios.post('/painel', {
      "idEmpresa": sessionStorage.getItem('idEmpresa'),
      "Setor": sessionStorage.getItem('descricaoSetor'),
      "Descricao": document.getElementById('descricao').value,
      "Link": document.getElementById('linkPainel').value

    }, config)
    .then(function (response) {
      alert("Painel cadastrao com sucesso !")
      location.reload()
    })
    .catch(function (erro) {
      console.log(erro)
      alert("Problema no cadastro !")
    })
}

async function excluiPainel() {
  var b = document.getElementById("SelectSetor").options;
  await axios.delete('/deletaPainel/' + sessionStorage.getItem('idPainel'), config)
    .then(function (response) {
      alert('Painel excluido com sucesso')      
      location.reload()

    })
    .catch(function (error) {
      console.log(error)
    })
}

function limparCampos() {

  const campos = document.getElementById('campos')
  campos.disabled = true
  document.getElementById("formAltera").reset();
  document.getElementById("form").reset();
  sessionStorage.setItem('idEmpresa', '')
  sessionStorage.setItem('idPainel', '')
  document.querySelectorAll('#selectPainel option').forEach(option => option.remove())

}
carregaEmpresa()
carregaEmpresaAltera()
limparCampos()
