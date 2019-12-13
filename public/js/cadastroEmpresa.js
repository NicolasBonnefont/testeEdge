var url ='https://api-mor.herokuapp.com'

// FUNCAO QUE CRIA EMPRESA
async function cadastraEmpresa() {

  event.preventDefault()
  
  const empresa = document.getElementById('empresa').value;
  const linkbi = document.getElementById('linkbi').value;
  

  await axios.post('/empresa', {
      "empresa": `${empresa}`,
      "bi": `${linkbi}`
    })

    .then(function (response) {

      if (response.data.err) {
        console.log(response.data.erro)
        alert('Empresa já existe')
      }

      if (response.status === 200) {
        console.log(response.data)
        alert('Empresa Cadastrada com Sucesso !')
        
        document.getElementById("form").reset();

      }

    })
    .catch(function (error) {
      console.log(error)
      alert('Empresa já exite ! !', error)


    })
}

// FUNCAO QUE BUSCA O USUARIO

async function buscarEmpresa() {
  event.preventDefault()

  //campos do busca
  const empresaBusca = document.getElementById('empresaBusca').value
  const campos = document.getElementById('campos')

  
  await axios.get("/empresa/" + empresaBusca)

    .then(function (response) {

      campos.disabled = false

      empresaAltera.value = response.data.empresa
      linkbiAltera.value = response.data.bi
      

    })
    .catch(function (error) {
      alert("Empresa não encotrada")
      campos.disabled = true
      document.getElementById("formBusca").reset();
      document.getElementById("formAltera").reset();

    })

}

// FUNÇÃO QUE ALTERA O USUARIO DA PESQUISA
async function alterarEmpresa() {
  event.preventDefault()

  const campos = document.getElementById('campos')

  const empresaAltera = document.getElementById('usuarioAltera').value
  const linkbiAltera = document.getElementById('linkbiAltera').value



  await axios.put("/empresa", {
      "empresa": `${empresaAltera}`,
      "bi": `${linkbiAltera}`
    })

    .then(function (response) {
      alert("Empresa alterada com sucesso !")
      campos.disabled = true
      document.getElementById("formBusca").reset();
      document.getElementById("formAltera").reset();


    })
    .catch(function (error) {

      alert("Não foi possivel alterar este cadastro")

    })
}

async function excluirEmpresa(){
  event.preventDefault()

  const empresaAltera = document.getElementById('usuarioAltera').value
  

  await axios.delet("/empresa/"+empresaAltera)

  .then(function (response) {
    alert("Empresa excluida com sucesso !")
    campos.disabled = true
    document.getElementById("formBusca").reset();
    document.getElementById("formAltera").reset();


  })
  .catch(function (error) {

    alert("Não foi possivel excluir")

  })
}



