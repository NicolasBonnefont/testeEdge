// FUNCAO QUE CRIA USUARIO
async function cadastraUsuario() {

  event.preventDefault()

  const username = document.getElementById('username').value;
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value
  const email = document.getElementById('email').value
  const empresa = document.getElementById('empresa').value
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

  var conteudo = {
    header: {
      "content-type": "multipart/form-data"
    }
  }
  await axios.post('/files', data, conteudo)

    .then(function (response) {
      url = response.data.url

    }).catch(function (err) {
      alert("Verificar log")
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
    })

    .then(function (response) {

      if (response.data.err) {
        console.log(response.data.erro)
        alert('Usuario já existe')
      }

      if (response.status === 200) {
        alert('Usuario Cadastrado com Sucesso !')
        document.getElementById("form").reset();
        document.getElementById("image").src = 'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg';

      }

    })
    .catch(function (error) {
      alert("Verificar log")
      console.log(err)
      

    })
}

// FUNCAO QUE BUSCA O USUARIO

async function buscarUsuario() {
  event.preventDefault()

  //campos do busca
  const usuarioBusca = document.getElementById('usuarioBusca').value
  const campos = document.getElementById('campos')
  var imgAltera = document.getElementById('imgAltera')

  await axios.get("/users/" + usuarioBusca)

    .then(function (response) {
      
      campos.disabled = false

      usuarioAltera.value = response.data.name
      emailAltera.value = response.data.email
      empresaAltera.value = response.data.empresa
      adminAltera.value = response.data.admin
      cargoAltera.value = response.data.cargo
      document.getElementById("imageAltera").src = response.data.url     
      urlID = response.data.urlID
      url = response.data.url
      imgAltera.attributes.removeNamedItem('disabled')
      

      if (adminAltera.value == 1) {
        adminAltera.checked = true
      } else {
        adminAltera.checked = false
      }


    })
    .catch(function (error) {      
      console.log(err)
      alert("Usuario não encotrado, verificar log.")
      campos.disabled = true
      document.getElementById("formBusca").reset();
      document.getElementById("formAltera").reset();

    })

}

// FUNÇÃO QUE ALTERA O USUARIO DA PESQUISA
async function alterarUsuario() {
  event.preventDefault()
  
  const campos = document.getElementById('campos')
  const usuarioAltera = document.getElementById('usuarioAltera').value
  const emailAltera = document.getElementById('emailAltera').value
  const empresaAltera = document.getElementById('empresaAltera').value
  const usuarioBusca = document.getElementById('usuarioBusca').value
  const imgAltera = document.getElementById('imgAltera').files[0]
  const adminAltera = document.getElementById('adminAltera').value
  const cargoAltera = document.getElementById("cargoAltera").value
  var data = sessionStorage.getItem("user")
  const user = JSON.parse(data)
  var adminAlteraOK = 0
  var urlAltera = url
  

  if (adminAltera.checked) {

    adminAlteraOK = 1
  } else {

    adminAlteraOK = 0
  }

  if (!imgAltera == ''){

  await axios.delete("/files/" + urlID)
  
  .then(function(response){
    
  })
  .catch(function(error){
    console.log(error)
  return alert("Houve um problema !")
  })

 

  let dataAltera = new FormData()
  dataAltera.append("file", imgAltera)

  var conteudo = {
    header: {
      "content-type": "multipart/form-data"
    }
  }
   //CHECA SE FOI FEITO ALTERAÇÃO NA IMG
   // SE ALTERADO, ASSUME A NOVA URL E ID
  
    
    await axios.post('/files', dataAltera, conteudo)
 
    .then(function (response) {
      urlAltera = response.data.url
      urlID = response.data.id
      

    }).catch(function (err) {
      alert("Verificar log")
      console.log(err)

    });

  }

  await axios.put("/users", {
      "name": `${usuarioAltera}`,
      "email": `${emailAltera}`,
      "username": `${usuarioBusca}`,
      "empresa": `${empresaAltera}`,
      "cargo": `${cargoAltera}`,
      "admin": `${adminAlteraOK}`,
      "url": urlAltera,
      "urlID": urlID
    })

    .then(function (response) {
      var data = sessionStorage.getItem("user")
      const u = JSON.parse(data)
      u.url = urlAltera
      const user = JSON.stringify(u)
      sessionStorage.setItem("user", user)
      
      console.log(sessionStorage.getItem(user))
      alert("Usuário alterado com sucesso !")
      campos.disabled = true
      limparCampos()

    })
    .catch(function (error) {
      
      console.log(error)
      alert("Não foi possivel alterar este cadastro, verificar log")

    })
    
}

async function excluirUsuario() {
  event.preventDefault()

  const campos = document.getElementById('campos')
  const usuarioBusca = document.getElementById('usuarioBusca').value

  await axios.delete("/files/" + urlID)

  .then(function(response){

   alert("Usuario excluido com sucesso !")
   console.log(response)

  })
  .catch(function(error){

    console.log(error)    
    alert("Verificar log")
    
  })

  await axios.delete("/users/" + usuarioBusca)

    .then(function (response) {
      alert("Usuário excluido com sucesso !")
      campos.disabled = true
      document.getElementById("formBusca").reset();
      document.getElementById("formAltera").reset();

    })
    .catch(function (error) {
      console.log(error)       
      campos.disabled = true
      alert("Não foi possivel excluir este cadastro, verificar log")
      document.getElementById("formBusca").reset();
      document.getElementById("formAltera").reset();
    })

  
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
      "ajax": "../users",
      "columns": [{
          "data": "username"
        },
        {
          "data": "name"
        },
        {
          "data": "email"
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
