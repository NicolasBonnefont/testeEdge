// SE JA ESTIVER LOGADO, DESCONSIDERA TELA DE LOGIN
const config = {
  headers: {
    Authorization: 'Bearer ' + sessionStorage.getItem('sessao')
  }
}
async function verificaLogado() {
  await axios.get('../acesso', config)
    .then(function (response) {
      window.location.replace("../pag/principal");
    })
    .catch(function (err) {
      sessionStorage.clear()
      localStorage.clear()
    })
}
verificaLogado()



// FUNCAO DE LOGAR NO SISTEMA
async function logar() {
  event.preventDefault()
  
  const password = document.getElementById('password').value
  const email = document.getElementById('email').value


  await axios.post('/sessions', {
      "password": `${password}`,
      "email": `${email}`
    })
 
    .then(function (response) {


      sessionStorage.setItem('sessao', response.data.token)

      let timerInterval
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Logado com sucesso !',
        showConfirmButton: false,
        timer: 1800
        
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.replace("pag/principal");
        }
      })

      
     
   

    })
    .catch(function (error) {
     if(error.response.data[0].field == 'email'){
       alert("Email não existe")
       document.getElementById('email').focus()
     }
     if(error.response.data[0].field == 'password'){
      alert("Senha inválida !")
      document.getElementById('password').focus()
     }
     if(!error.response.data[0].field == 'email' && !error.response.data[0].field == 'password')
      alert("Problema na autenticação !")
     
    })

}
