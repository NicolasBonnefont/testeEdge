async function carregaUsuario() {
  var dados

  await axios.get('/users', config)
    .then(function (response) {
      dados = response.data.data
    })
    .catch(function (error) {})

  for (var i = 0; i < dados.length; i++) {
    var select = document.getElementById("Select")
    var option = document.createElement("option")
    option.text = dados[i].username;
    select.add(option);
  }
}

async function carregaEmpresa() {
  var dadosEmpresa

  await axios.get('/empresas', config)
    .then(function (response) {
      dadosEmpresa = response.data.data
    })
    .catch(function (error) {})

  for (var i = 0; i < dadosEmpresa.length; i++) {
    var SelectEmpresa = document.getElementById("SelectEmpresa")
    var optionEmpresa = document.createElement("option")
    optionEmpresa.text = dadosEmpresa[i].empresa;
    SelectEmpresa.add(optionEmpresa);
  }
  for (var i = 0; i < dadosEmpresa.length; i++) {
    var SelectAltera = document.getElementById("selectEmpresaAltera")
    var optionEmpresaAltera = document.createElement("option")
    optionEmpresaAltera.text = dadosEmpresa[i].empresa;
    SelectAltera.add(optionEmpresaAltera);
  }
}

async function igualaPainelCadastro() {

  // traz os dashs conforme a empresa selecionada
  document.querySelectorAll('#selectPainel option').forEach(option => option.remove())
  document.querySelectorAll('#selectPainel option').innerText = 'Selecione o Setor'
  var empresaBusca = ''

  var x = document.getElementById("SelectEmpresa").selectedIndex;
  var y = document.getElementById("SelectEmpresa").options;
  empresaBusca = y[x].text

  //so entra na funcao de pesquisa se for diferente ao selecione a empresa
  if (!(empresaBusca == "Selecione a Empresa")) {

    await axios.post('/empresas', {
        "empresa": empresaBusca
      }, config)
      .then(function (response) {
        sessionStorage.setItem('idEmpresa', response.data.id)
      })
      .catch(function (error) {})

    await axios.post('/painelEmpresa', {
        "idEmpresa": sessionStorage.getItem('idEmpresa')
      }, config)

      .then(function (response) {

        for (var i = 0; i < response.data.length; i++) {
          var selectPainel = document.getElementById("selectPainel")
          var option = document.createElement("option")
          option.text = response.data[i].Descricao;
          selectPainel.add(option);
        }

        window.sessionStorage.setItem('idEmpresa', idEmpresa)

      })
      .catch(function (error) {

      })
  }
}

async function carregaIdPainel() {
  // carrega o id do painel conforme os campos da empresa e o dash escolhido

  var painelBusca = ''
  sessionStorage.setItem('idPainel', '')

  var x = document.getElementById("selectPainelAltera").selectedIndex;
  var y = document.getElementById("selectPainelAltera").options;
  painelBusca = y[x].text

  await axios.post('/carregaIdPainel', {
      "idEmpresa": sessionStorage.getItem('idEmpresa'),
      "descricao": painelBusca
     }, config)
    .then(function (response) {      
      sessionStorage.setItem('idPainel', response.data[0].id)
      sessionStorage.setItem('descricaoPainel', response.data[0].Descricao)
    

    })
    .catch(function (error) {
      console.log(error)
    })

}


// FUNCAO QUE CRIA USUARIO
async function cadastraUsuario() {
 event.preventDefault()
 await carregaIdPainel()

  var x = document.getElementById("SelectEmpresa").selectedIndex;
  var y = document.getElementById("SelectEmpresa").options;
  var empresaCadastra = y[x].text

  const username = document.getElementById('username').value;
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value
  const email = document.getElementById('email').value
  const admin = document.getElementById('admin')
  const imgNovo = document.getElementById('imgNovo').files[0]

  var url = ''
  var adminOK = 0

  let data = new FormData()
  data.append("file", imgNovo)

  if (admin.checked) {
    adminOK = 1
  } else {
    adminOK = 0
  }

  await axios.post('/files', data, configMultipart)

    .then(function (response) {
      url = response.data.url

    }).catch(function (err) {

      console.log(err)

    });

  await axios.post('/users', {
      "username": `${username}`,
      "name": `${name}`,
      "password": `${password}`,
      "email": `${email}`,
      "idPainel": sessionStorage.getItem('idPainel'),
      "painel": sessionStorage.getItem('descricaoPainel'),
      "empresa": `${empresaCadastra}`,
      "admin": `${adminOK}`,
      "url": url
    }, config)

    .then(function (response) {

      if (response.data.err) {
        console.log(response.data.erro)
        alert('Usuario já existe')
      }

      if (response.status === 200) {
        alert('Usuario Cadastrado com Sucesso !')
        document.getElementById("form").reset();
        document.location.reload();
      }

    })
    .catch(function (error) {
      alert("Verificar log")
      console.log(error)


    })
}

async function igualaPainelAltera() {

  // traz os dashs conforme a empresa selecionada
  document.querySelectorAll('#selectPainelAltera option').forEach(option => option.remove())
  document.querySelectorAll('#selectPainelAltera option').innerText = 'Selecione o Setor'
  var selectPainel = document.getElementById("selectPainelAltera")
  var option = document.createElement("option")
  option.text = 'Selecione o Painel...';
  selectPainel.add(option);

  var empresaBusca = ''

  var x = document.getElementById("selectEmpresaAltera").selectedIndex;
  var y = document.getElementById("selectEmpresaAltera").options;
  empresaBusca = y[x].text

  //so entra na funcao de pesquisa se for diferente ao selecione a empresa
  if (!(empresaBusca == "Selecione a Empresa")) {

    await axios.post('/empresas', {
        "empresa": empresaBusca
      }, config)
      .then(function (response) {
        sessionStorage.setItem('idEmpresa', response.data.id)
      })
      .catch(function (error) {})

    await axios.post('/painelEmpresa', {
        "idEmpresa": sessionStorage.getItem('idEmpresa')
      }, config)

      .then(function (response) {

        for (var i = 0; i < response.data.length; i++) {
          var selectPainel = document.getElementById("selectPainelAltera")
          var option = document.createElement("option")
          option.text = response.data[i].Descricao;
          selectPainel.add(option);
        }

        window.sessionStorage.setItem('idEmpresa', idEmpresa)

      })
      .catch(function (error) {

      })


  }
}

// FUNCAO QUE BUSCA O USUARIO
async function buscarUsuario() {
  event.preventDefault()

  

  // SELECT REFERENTE A BUSCA DE EMPRESA
  var a = document.getElementById("selectEmpresaAltera").selectedIndex;
  var b = document.getElementById("selectEmpresaAltera").options;

  var c = document.getElementById("selectPainelAltera").selectedIndex;
  var d = document.getElementById("selectPainelAltera").options;

  // SELECT REFERENTE A BUSCA DE USUARIO
  var x = document.getElementById("Select").selectedIndex;
  var y = document.getElementById("Select").options;
  var usuarioBusca = y[x].text

  const campos = document.getElementById('campos')
  var imgAltera = document.getElementById('imgAltera')

  if (!x == 0) {
    await axios.post('/user', {
        'username': `${usuarioBusca}`
      }, config)

      .then(function (response) {
        sessionStorage.setItem('id', response.data.id)
        
        campos.disabled = false

        usuarioAltera.value = response.data.name
        emailAltera.value = response.data.email

        b[0].text = response.data.empresa

        adminAltera.value = response.data.admin

        document.getElementById("imageAltera").src = response.data.url
        urlID = response.data.urlID
        url = response.data.url
        imgAltera.disabled = false


        if (adminAltera.value == 1) {
          adminAltera.checked = true
        } else {
          adminAltera.checked = false
        }

      }, config)

      .catch(function (error) {
        console.log(error)
        alert("Usuario não encotrado, verificar log.")
        limparCampos()

      })
      
       await igualaPainelAltera()
       await igualaPainelUsuario()
      
  }

}
// FUNÇÃO QUE ALTERA O USUARIO DA PESQUISA

async function igualaPainelUsuario(){

  var a = document.getElementById("selectPainelAltera").selectedIndex;
  var b = document.getElementById("selectPainelAltera").options;

  await axios.post('/painelCarrega',{"id": sessionStorage.getItem('id')}, config)
  .then(function(response){
    b[0].text = response.data.Descricao
    sessionStorage.setItem('idPainel', response.data.idPainel)
   
  })
  .catch(function(error){
    console.log(error)

  })

}

async function alterarUsuario() {
  event.preventDefault()
  
  var x = document.getElementById("Select").selectedIndex;
  var y = document.getElementById("Select").options;
  var usuarioBusca = y[x].text

  var painelAltera = ''
  var empresaAltera = ''

  if(!(document.getElementById("selectEmpresaAltera").selectedIndex == -1)){
    var a = document.getElementById("selectEmpresaAltera").selectedIndex;
    var b = document.getElementById("selectEmpresaAltera").options;
    empresaAltera = b[a].text
  }
  
  if(!(document.getElementById("selectPainelAltera").selectedIndex == -1)){
    var a = document.getElementById("selectPainelAltera").selectedIndex;
    var b = document.getElementById("selectPainelAltera").options;
    painelAltera = b[a].text
  }


  console.log(a)

  const campos = document.getElementById('campos')
  const emailAltera = document.getElementById('emailAltera').value
  const imgAltera = document.getElementById('imgAltera').files[0]
  const adminAltera = document.getElementById('adminAltera')
  const usuarioAltera = document.getElementById('usuarioAltera').value
  
  var adminAlteraOK = 0
  var urlAltera = url


  if (adminAltera.checked) {

    adminAlteraOK = 1
  }
  console.log(adminAlteraOK)
  if (!imgAltera == '') {

    await axios.delete("/files/" + urlID, configMultipart)

      .then(function (response) {

      })
      .catch(function (error) {
        console.log(error)
        return alert("Houve um problema !")
      })



    let dataAltera = new FormData()
    dataAltera.append("file", imgAltera)

    //CHECA SE FOI FEITO ALTERAÇÃO NA IMG
    // SE ALTERADO, ASSUME A NOVA URL E ID


    await axios.post('/files', dataAltera, configMultipart)

      .then(function (response) {
        urlAltera = response.data.url
        urlID = response.data.id


      }).catch(function (err) {

        console.log(err)

      });

  }

  await axios.put('/users', {
      "name": `${usuarioAltera}`,
      "email": `${emailAltera}`,
      "username": `${usuarioBusca}`,
      "empresa": `${empresaAltera}`,
      "painel": sessionStorage.getItem('descricaoPainel'),
      "idPainel": sessionStorage.getItem('idPainel'),
      "admin": `${adminAlteraOK}`,
      "url": urlAltera,
      "urlID": urlID
    }, config)

    .then(function (response) {

      urlUsuario = urlAltera
      urlIdUsuario = urlID
      alert("Usuário alterado com sucesso !")
      campos.disabled = true
      limparCampos()
      location.reload();

    })
    .catch(function (error) {

      console.log(error)
      alert("Não foi possivel alterar este cadastro, verificar log")
      
    })

}

async function excluirUsuario() {
  event.preventDefault()
  var x = document.getElementById("Select").selectedIndex;
  var y = document.getElementById("Select").options;
  var usuarioBusca = y[x].text
  const campos = document.getElementById('campos')


  await axios.delete("/files/" + urlID, configMultipart)

    .then(function (response) {

      console.log(response)

    })
    .catch(function (error) {

      console.log(error)

    })

  if (!x == 0) {

    await axios.post('/userDelete', {
        'username': `${usuarioBusca}`
      }, config)

      .then(function (response) {
        console.log(usuarioBusca)
        alert("Usuário excluido com sucesso !")
        campos.disabled = true
        document.getElementById("formBusca").reset();
        document.getElementById("formAltera").reset();
        document.location.reload();

      })
      .catch(function (error) {
        console.log(error)
        campos.disabled = true
        alert("Não foi possivel excluir este cadastro, verificar log")
        document.getElementById("formBusca").reset();
        document.getElementById("formAltera").reset();
      })

  }
}

// FUNCAO QUE REMOVE O EVENTO PADRAO DE SUBMIT DO BOTAO
function prevenir() {
  event.preventDefault()
}


// FUNCAO 
function atualizaTabela() {
  $('#teste').DataTable().ajax.reload();
}

function mostrarTabela() {

  $(document).ready(function () {

    $('#teste').DataTable({

      "ajax": {
        "url": '../users',
        "type": "GET",
        "beforeSend": function (xhr) {
          xhr.setRequestHeader("Authorization",
            "Bearer " + token)
        }
      },

      "columns": [{
          "data": "name"
        }
       

      ],
      "language": idioma,
      dom: 'Bfrtip',
      buttons: [
        'copyHtml5',
        'excelHtml5',
        'pdfHtml5',
        'print'

      ]

    })
  })
  var idioma = {

    "sEmptyTable": "Nenhum registro encontrado",
    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
    "sInfoPostFix": "",
    "sInfoThousands": ".",
    "sLengthMenu": "_MENU_ resultados por página",
    "sLoadingRecords": "Carregando...",
    "sProcessing": "Processando...",
    "sZeroRecords": "Nenhum registro encontrado",
    "sSearch": "Pesquisar",
    "oPaginate": {
      "sNext": "Próximo",
      "sPrevious": "Anterior",
      "sFirst": "Primeiro",
      "sLast": "Último"
    },
    "oAria": {
      "sSortAscending": ": Ordenar colunas de forma ascendente",
      "sSortDescending": ": Ordenar colunas de forma descendente"
    },
    "select": {
      "rows": {
        "_": "Selecionado %d linhas",
        "0": "Nenhuma linha selecionada",
        "1": "Selecionado 1 linha"
      }
    }
  }
}

function limparCampos() {
  document.getElementById("form").reset();
  document.getElementById("formBusca").reset();
  document.getElementById("formAltera").reset();
  document.getElementById("imageNovo").src = "https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg"
  document.getElementById("imageAltera").src = "https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg"
  document.getElementById("imgAltera").disabled = true
  document.getElementById("campos").disabled = true
  sessionStorage.setItem('idEmpresa', '')
  sessionStorage.setItem('id', '')
  sessionStorage.setItem('idPainel', '')
  sessionStorage.setItem('descricaoPainel', '')

}

function showImageNovo() {
  if (this.files && this.files[0]) {
    var obj = new FileReader()
    obj.onload = function (data) {
      var imgNovo = document.getElementById("imageNovo")
      imgNovo.src = data.target.result
    }
    obj.readAsDataURL(this.files[0])
  }
}

function showImageAltera() {
  console.log("NOVO IMG ")
  if (this.files && this.files[0]) {
    var obj = new FileReader()
    obj.onload = function (data) {
      var imgAltera = document.getElementById("imageAltera")
      imgAltera.src = data.target.result
    }
    obj.readAsDataURL(this.files[0])
  }
}
carregaEmpresa()
carregaUsuario()
mostrarTabela()
limparCampos()