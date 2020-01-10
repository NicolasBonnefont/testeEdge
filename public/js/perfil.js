var data = sessionStorage.getItem("user")
const u = JSON.parse(data)
document.getElementById("imgPerfil").src = u.url
document.getElementById("nomePerfil").innerHTML = u.name
document.getElementById("cargoPerfil").innerHTML = u.cargo
document.getElementById("emailPerfil").innerHTML = u.email
document.getElementById("imageAltera").src = u.url
document.getElementById("usuarioAltera").value = u.name

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



async function alteraUsuario() {
  event.preventDefault()
  
  const campos = document.getElementById('campos')
  const usuarioAltera = document.getElementById('usuarioAltera').value
  const imgAltera = document.getElementById('imgAltera').files[0]
  var urlAltera = ''

  if (!imgAltera == ''){

  await axios.delete("/files/" + u.urlID)
  
  .then(function(response){
    console.log(response.data)
  })
  .catch(function(error){
    console.log(error)
   alert("Houve um problema !")
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
      "url": urlAltera,
      "urlID": urlID
    })

    .then(function (response) {
      var data = sessionStorage.getItem("user")
      const u = JSON.parse(data)
      u.url = urlAltera
      const user = JSON.stringify(u)
      sessionStorage.setItem("user", user)
   
      alert("Usuário alterado com sucesso !")
      campos.disabled = true
      limparCampos()

    })
    .catch(function (error) {
      
      console.log(error)
      alert("Não foi possivel alterar este cadastro, verificar log")

    })
    
}