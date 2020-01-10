var data = sessionStorage.getItem("user")
const u = JSON.parse(data)
document.getElementById("imgPerfil").src = u.url
document.getElementById("nomePerfil").innerHTML = u.name
document.getElementById("cargoPerfil").innerHTML = u.cargo
document.getElementById("emailPerfil").innerHTML = u.email
document.getElementById("imageAltera").src = u.url
document.getElementById("usuarioAltera").value = u.name

async function alteraUsuario() {
  event.preventDefault()

  const campos = document.getElementById('campos')
  var usuarioAltera = document.getElementById('usuarioAltera').value
  var senhaAltera = document.getElementById('senhaAltera').value
  var imgAltera = document.getElementById('imgAltera').files[0]
  var urlAltera = u.url
  var urlID = u.urlID

  if (!imgAltera == '') {
    console.log("entrou no if " + u.urlID)

   
    await axios.delete("/files/" + u.urlID)

      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
        
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

      })
      .catch(function (err) {
        alert("Verificar log")
        console.log(err)

      });

  }

  await axios.put("/users", {
    "username": u.username,
    "name": `${usuarioAltera}`,
    "url": urlAltera,
    "urlID": urlID,
    "password": senhaAltera
  })

    .then(function (response) {
      var data = sessionStorage.getItem("user")
      const u = JSON.parse(data)
      u.url = urlAltera
      u.urlID = urlID
      const user = JSON.stringify(u)
      sessionStorage.setItem("user", user)

      alert("Usuário alterado com sucesso !")
      campos.disabled = true      
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