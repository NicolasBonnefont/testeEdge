// CONFIG PARA ENVIAR DADOS DO TIPO ARQUIVO COM TOKEN
const token = sessionStorage.getItem('sessao')
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


async function carregaUsuario(){  
  var dados
 
  await axios.get('/users', config)
  .then(function(response){
     dados = response.data.data
  })
  .catch(function(error){
  })

  for (var i = 0; i < dados.length; i++) {
    var select = document.getElementById("Select")
    var option = document.createElement("option")
    option.text = dados[i].username;
    select.add(option);
}
}

async function carregaEmpresa(){
  var dadosEmpresa
 
  await axios.get('/empresas', config)
  .then(function(response){
    dadosEmpresa = response.data.data
  })
  .catch(function(error){
  })  

  for (var i = 0; i < dadosEmpresa.length; i++) {
    var SelectEmpresa = document.getElementById("SelectEmpresa")
    var optionEmpresa = document.createElement("option")
    optionEmpresa.text = dadosEmpresa[i].empresa;
    SelectEmpresa.add(optionEmpresa);
}
  for (var i = 0; i < dadosEmpresa.length; i++) {
    var SelectAltera = document.getElementById("SelectAltera")
    var optionEmpresaAltera = document.createElement("option")
    optionEmpresaAltera.text = dadosEmpresa[i].empresa;
    SelectAltera.add(optionEmpresaAltera);
}
}
carregaEmpresa()
carregaUsuario()


// FUNCAO QUE CRIA USUARIO
  async function cadastraUsuario() {
  event.preventDefault()
  var x = document.getElementById("Select").selectedIndex;
  var y = document.getElementById("Select").options;
  var empresa = y[x].text

  const username = document.getElementById('username').value;
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value
  const email = document.getElementById('email').value
  const admin = document.getElementById('admin')
  const cargo = document.getElementById('cargo').value
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
      "cargo": `${cargo}`,
      "empresa": `${empresa}`,
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

// FUNCAO QUE BUSCA O USUARIO

async function buscarUsuario() {
  event.preventDefault()
  
  var a = document.getElementById("SelectAltera").selectedIndex;
  var b = document.getElementById("SelectAltera").options;
  
  var x = document.getElementById("Select").selectedIndex;
  var y = document.getElementById("Select").options;

  var usuarioBusca = y[x].text
  
  const campos = document.getElementById('campos')
  var imgAltera = document.getElementById('imgAltera')

  if(!x == 0){
  await axios.get("/users/" + usuarioBusca, config)

    .then(function (response) {

      campos.disabled = false

      usuarioAltera.value = response.data.name
      emailAltera.value = response.data.email
      a = 0
      b[a].text = response.data.empresa       
     
      adminAltera.value = response.data.admin
      cargoAltera.value = response.data.cargo
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
      campos.disabled = true
      document.getElementById("formBusca").reset();
      document.getElementById("formAltera").reset();

    })
  }
}
// FUNÇÃO QUE ALTERA O USUARIO DA PESQUISA

async function alterarUsuario() {
  event.preventDefault()
  var x = document.getElementById("Select").selectedIndex;
  var y = document.getElementById("Select").options;
  var usuarioBusca = y[x].text

  var a = document.getElementById("SelectAltera").selectedIndex;
  var b = document.getElementById("SelectAltera").options;
  var empresaAltera = b[a].text

  
  const campos = document.getElementById('campos') 
  const emailAltera = document.getElementById('emailAltera').value
  const imgAltera = document.getElementById('imgAltera').files[0]
  const adminAltera = document.getElementById('adminAltera')
  const usuarioAltera = document.getElementById('usuarioAltera').value
  const cargoAltera = document.getElementById("cargoAltera").value
  var data = sessionStorage.getItem("user")
  const user = JSON.parse(data)
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
      "cargo": `${cargoAltera}`,
      "admin": `${adminAlteraOK}`,
      "url": urlAltera,
      "urlID": urlID
    },config)

    .then(function (response) {
      var data = sessionStorage.getItem("user")
      const u = JSON.parse(data)
      u.url = urlAltera
      u.urlID = urlID
      const user = JSON.stringify(u)
      sessionStorage.setItem("user", user)

      alert("Usuário alterado com sucesso !")
      campos.disabled = true
      limparCampos()
      document.location.reload();

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

  if(!x == 0){
  await axios.delete("/users/" + usuarioBusca, config)

    .then(function (response) {
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
        }},

       "columns": [{
          "data": "name"
        },
        {
          "data": "email"
        },
        {
          "data": "cargo"
        },
        {
          "data": "admin"
        }
      ],
      "language": idioma,
      buttons: [
        'copy', 'excel', 'pdf'
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

mostrarTabela()
