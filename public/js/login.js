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
//CHAMA A FUNCAO A TODOS OS  LOADING DAS PAGINAS
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

      alert("Logado com Sucesso")

      window.location.replace("pag/principal");



    })
    .catch(function (error) {
      console.log(error)
      alert("Problema na autenticação !")


    })

}
