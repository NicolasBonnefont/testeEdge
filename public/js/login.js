// SE JA ESTIVER LOGADO, DESCONSIDERA TELA DE LOGIN

function verificaLogado() {
  const on = sessionStorage.getItem('sessao')

  if (on) {
    window.location.replace("pag/principal");
  }
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
      //CARREGA OS DADOS VINDO BACKEND
      const bi = response.data.empresas.bi
      var empresa = response.data.empresas.empresa
      const sessao = response.data.token.token
      let user = response.data.user
      let usuario = JSON.stringify(user)
      let url = response.data.empresas.url


      // QUANDO O STATUS VINDO DO BACKEND FOR 200, AI FAZ O LOGIN
      if (response.status === 200) {

        sessionStorage.setItem('empresa', empresa)
        sessionStorage.setItem('bi', bi)
        sessionStorage.setItem('sessao', sessao)
        sessionStorage.setItem('user', usuario)
        sessionStorage.setItem('empresaUrl', url)


        alert("Logado com Sucesso")
        window.location.replace("pag/principal");

      }

    })
    .catch(function (error) {
      console.log(error)
      alert("Problema na autenticação !")


    })

}
