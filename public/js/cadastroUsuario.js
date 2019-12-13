var url ='https://api-mor.herokuapp.com'

// FUNCAO QUE CRIA USUARIO
async function cadastraUsuario() {

  event.preventDefault()

  const username = document.getElementById('username').value;
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value
  const email = document.getElementById('email').value
  const empresa = document.getElementById('empresa').value
  const admin = document.getElementById('admin')
  const adminOK = 0

  if(admin.checked){
   adminOK === 1
  }else{
    adminOK === 0
  }
  
  await axios.post('/users', {
      "username": `${username}`,
      "name": `${name}`,
      "password": `${password}`,
      "email": `${email}`,
      "empresa":`${empresa}`,
      "admin":`${adminOK}`
    })

    .then(function (response) {

      if (response.data.err) {
        console.log(response.data.erro)
        alert('Usuario já existe')
      }

      if (response.status === 200) {
        console.log(response.data)
        alert('Usuario Cadastrado com Sucesso !')
        document.getElementById("form").reset();

      }

    })
    .catch(function (error) {
      console.log(error)
      alert('Usário/Email já exite ! !', error)


    })
}

// FUNCAO QUE BUSCA O USUARIO

async function buscarUsuario() {
  event.preventDefault()

  //campos do busca
  const usuarioBusca = document.getElementById('usuarioBusca').value
  const campos = document.getElementById('campos')

  
  await axios.get("/users/" + usuarioBusca)
  
    .then(function (response) {


      
      campos.disabled = false

      usuarioAltera.value = response.data.name
      emailAltera.value = response.data.email
      empresaAltera.value = response.data.empresa
      adminAltera.value =  response.data.admin
      if ( adminAltera.value ===1){
        console.log(' adminAltera ok')
      }
     

    })
    .catch(function (error) {
      console.log([response.data.user.admin])
      alert("Usuario não encotrado")
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
  const adminAltera = document.getElementById('adminAltera').value
  const adminOK = 0

  if(adminAltera.checked = true){
    
    adminOK.value = 1
  }


  await axios.put("/users", {
      "name": `${usuarioAltera}`,
      "email": `${emailAltera}`,
      "username": `${usuarioBusca}`,
      "empresa": `${empresaAltera}`,
      "admin":`${adminOK}`
    })

    .then(function (response) {
      alert("Usuário alterado com sucesso !")
      campos.disabled = true
      document.getElementById("formBusca").reset();
      document.getElementById("formAltera").reset();


    })
    .catch(function (error) {

      alert("Não foi possivel alterar este cadastro")

    })
}

async function excluirUsuario(){

  event.preventDefault()

  const campos = document.getElementById('campos')
  const usuarioBusca = document.getElementById('usuarioBusca').value

console.log(usuarioAltera)
  await axios.delete("/users/"+usuarioBusca)

    .then(function (response) {
      alert("Usuário excluido com sucesso !")
      campos.disabled = true
      document.getElementById("formBusca").reset();
      document.getElementById("formAltera").reset();
     
    })
    .catch(function (error) {
      campos.disabled = true
      alert("Não foi possivel excluir este cadastro")
      document.getElementById("formBusca").reset();
      document.getElementById("formAltera").reset();
    })
}
function prevenir(){
  event.preventDefault()
}