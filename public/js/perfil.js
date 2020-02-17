var usuario
var nomeUsuario
var emailUsuario
var urlUsuario
var urlIdUsuario
var adminUsuario
var urlCapaUsuario
var urlIdCapaUsuario
var painelUsuario
var empresaUsuario

// carrega os dados do usuario logado
async function carregaUsuario() {

  await axios.get('../acesso', config)
    .then(function (response) {
      usuario = response.data.usuario.username
      nomeUsuario = response.data.usuario.name
      emailUsuario = response.data.usuario.email
      urlUsuario = response.data.usuario.url
      urlIdUsuario = response.data.usuario.urlID
      adminUsuario = response.data.usuario.admin
      urlCapaUsuario = response.data.usuario.urlCapa
      urlIdCapaUsuario = response.data.usuario.idcapa
      painelUsuario = response.data.usuario.painel
      empresaUsuario = response.data.usuario.empresa
    })
    .catch(function (err) {
      console.log(err)
      deslogar()
    })

  //  iguala os campos do usuario logado no HTML
  document.getElementById("imgPerfil").src = urlUsuario
  document.getElementById("nomePerfil").innerHTML = nomeUsuario
  document.getElementById("emailPerfil").innerHTML = emailUsuario
  document.getElementById("imageAltera").src = urlUsuario
  document.getElementById("usuarioAltera").value = nomeUsuario
  document.getElementById("imageAlteraCapa").src = urlCapaUsuario
  document.getElementById("fundoCapa").style.backgroundImage = "url(" + urlCapaUsuario + ")";

  // Verifica se tem uma capa, se nao, trazer um padrao
  if (!urlCapaUsuario) {
    document.getElementById("fundoCapa").style.backgroundImage = "url('../img/fundo.jpg')";

  }
}

async function alteraUsuario() {
  event.preventDefault()

  const campos = document.getElementById('campos')
  var usuarioAltera = document.getElementById('usuarioAltera').value
  var senhaAltera = document.getElementById('senhaAltera').value
  var imgAltera = document.getElementById('imgAltera').files[0]
  var urlAltera = urlUsuario
  var urlID = urlIdUsuario

  if (!imgAltera == '') {

    await axios.delete("/files/" + urlIdUsuario, configMultipart)

      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)

      })

    let dataAltera = new FormData()
    dataAltera.append("file", imgAltera)

    //CHECA SE FOI FEITO ALTERAÇÃO NA IMG
    // SE ALTERADO, ASSUME A NOVA URL E ID

    await axios.post('/files', dataAltera, configMultipart)

      .then(function (response) {
        urlAltera = response.data.url
        urlID = response.data.id

      })
      .catch(function (err) {
        alert("Verificar log")
        console.log(err)

      });

  }
  var dados = {
    "username": usuario,
    "name": `${usuarioAltera}`,
    "url": urlAltera,
    "urlID": urlID
  }
  if (senhaAltera) {
    dados = {
      "username": usuario,
      "name": `${usuarioAltera}`,
      "url": urlAltera,
      "urlID": urlID,
      "password": senhaAltera
    }
  }

  await axios.put("/users", dados, config)

    .then(function (response) {

      urlUsuario = urlAltera
      urlIdCapaUsuario = urlID
      nomeUsuario = usuarioAltera



      alert("Usuário alterado com sucesso !")
      campos.disabled = true
      document.location.reload();
    })
    .catch(function (error) {

      console.log(error)
      alert("Não foi possivel alterar este cadastro, verificar log")

    })
}
async function alteraUsuarioCapa() {
  event.preventDefault()


  var imgAlteraCapa = document.getElementById('imgAlteraCapa').files[0]
  var urlAlteraCapa = urlCapaUsuario
  var urlIDCapa = urlIdCapaUsuario

  if (!imgAlteraCapa == '') {

    await axios.delete("/files/" + urlIDCapa, config)

      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)

      })



    let dataAltera = new FormData()
    dataAltera.append("file", imgAlteraCapa)

    //CHECA SE FOI FEITO ALTERAÇÃO NA IMG
    // SE ALTERADO, ASSUME A NOVA URL E ID

    await axios.post('/files', dataAltera, configMultipart)

      .then(function (response) {
        urlAlteraCapa = response.data.url
        urlIDCapa = response.data.id
     

      })
      .catch(function (err) {
        alert("Verificar log")
        console.log(err)

      });

  }

  await axios.put("/users", {
      "username": usuario,
      "urlCapa": urlAlteraCapa,
      "IDCapa": urlIDCapa,
    }, config)

    .then(function (response) {

      document.location.reload();
    })
    .catch(function (error) {

      console.log(error)
      alert("Não foi possivel alterar este cadastro, verificar log")

    })
}


function limparCampos() {

  document.getElementById("formAltera").reset();
  document.getElementById("imageAltera").src = "https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg"
  document.getElementById("imgAltera").disabled = true
}

function showImageAltera() {
 
  if (this.files && this.files[0]) {
    var obj = new FileReader()
    obj.onload = function (data) {
      var imgAltera = document.getElementById("imageAltera")
      imgAltera.src = data.target.result
    }
    obj.readAsDataURL(this.files[0])
  }
}

function showImageAlteraCapa() {

  if (this.files && this.files[0]) {
    var obj = new FileReader()
    obj.onload = function (data) {
      var imgAlteraCapa = document.getElementById("imageAlteraCapa")
      imgAlteraCapa.src = data.target.result
    }
    obj.readAsDataURL(this.files[0])
  }
}

carregaUsuario()
