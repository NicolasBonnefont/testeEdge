var url = 'https://api-mor.herokuapp.com'

// FUNCAO QUE CRIA EMPRESA
async function cadastraEmpresa() {

  event.preventDefault()
  const empresa = document.getElementById('empresa').value;
  const linkbi = document.getElementById('linkbi').value;
  const imgNovo = document.getElementById('imgNovo').files[0]
  var url = ''


  let data = new FormData()
  data.append("file", imgNovo)

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

  await axios.post('/empresa', {
      "empresa": `${empresa}`,
      "bi": `${linkbi}`,
      "url": `${url}`
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
  var id = ''


    .then(function (response) {
      campos.disabled = false
      empresaAltera.value = response.data.empresa
      linkbiAltera.value = response.data.bi
      id = response.data.id
      sessionStorage.setItem('idEmpresa', id)
      document.getElementById("imageAltera").src = response.data.url
      imgAltera.attributes.removeNamedItem('disabled')
      urlID = response.data.urlID
      url = response.data.url
      
    })
    .catch(function (error) {
      console.log(error)
      alert("Empresa não encotrada, verificar log!")
      campos.disabled = true
      document.getElementById("formBusca").reset();
      document.getElementById("formAltera").reset();

    })

}

// FUNÇÃO QUE ALTERA O USUARIO DA PESQUISA
async function alteraEmpresa() {
  event.preventDefault()
  const campos = document.getElementById('campos')
  const empresaAltera = document.getElementById('empresaAltera').value
  const linkbiAltera = document.getElementById('linkbiAltera').value
  const imgAltera = document.getElementById('imgAltera').files[0]
  var urlAltera = url

  if (!imgAltera == '') {
    console.log("url altera =  "+urlAltera)
    await axios.delete("/files/" + urlID)
    
      .then(function (response) {

      })
      .catch(function (error) {
        console.log(error)
        return alert("Houve um problema, verificar log !")
        
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
  console.log("urlID: "+urlID)
  console.log("URL ALTERA:  "+urlAltera)

  // AQUI OK ! 
  await axios.put("/empresa", {
      "empresa": `${empresaAltera}`,
      "bi": `${linkbiAltera}`,
      "url": urlAltera,
      "urlID": urlID,
      "id": id
    })

    .then(function (response) {
      alert("Empresa alterada com sucesso !")
      campos.disabled = true
      document.getElementById("formBusca").reset()
      document.getElementById("formAltera").reset()
      sessionStorage.removeItem('id')
      campos.disabled = true
      limparCampos()

    })
    .catch(function (error) {
      console.log(error)
      alert("Não foi possivel alterar este cadastro")
    })
}

async function excluirEmpresa() {
  event.preventDefault()

  const empresaAltera = document.getElementById('usuarioAltera').value

  await axios.delete("/files/" + urlID)

    .then(function (response) {

      alert("Usuario excluido com sucesso !")
      console.log(response)

    })
    .catch(function (error) {

      console.log(error)
      alert("Verificar log")

    })



  await axios.delete("/empresa/" + empresaAltera)

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

function atualizaTabela() {
  $('#teste').DataTable().ajax.reload();
}

function mostrarTabela() {
  $(document).ready(function () {
    $('#teste').DataTable({
      "ajax": "../empresa/",
      "columns": [{
          "data": "empresa"
        },
        {
          "data": "bi"
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

function limparCampos() {
  document.getElementById("form").reset();
  document.getElementById("formBusca").reset();
  document.getElementById("formAltera").reset();
  document.getElementById("imageNovo").src = "https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg"
  document.getElementById("imageAltera").src = "https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg"
}
mostrarTabela()
