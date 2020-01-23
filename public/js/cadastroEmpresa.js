const token = sessionStorage.getItem('sessao')
const config = {
  headers: {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'multipart/form-data'
  }
}

async function carregaEmpresa() {
  var dados

  await axios.get('/empresa', config)
    .then(function (response) {
      dados = response.data.data
    })
    .catch(function (error) {})

  for (var i = 0; i < dados.length; i++) {
    var select = document.getElementById("Select")
    var option = document.createElement("option")
    option.text = dados[i].empresa;
    select.add(option);
  }
}

carregaEmpresa()

// FUNCAO QUE CRIA EMPRESA
async function cadastraEmpresa() {
  event.preventDefault()
  const empresa = document.getElementById('empresa').value;
  const linkbi = document.getElementById('linkbi').value;
  const imgNovo = document.getElementById('imgNovo').files[0]
  var url = ''

  let data = new FormData()
  data.append("file", imgNovo)

  await axios.post('/files', data, config)

    .then(function (response) {
      url = response.data.url

    }).catch(function (err) {
      console.log(err)
    });

  await axios.post('/empresa', {
      "empresa": `${empresa}`,
      "bi": `${linkbi}`,
      "url": `${url}`
    }, config)

    .then(function (response) {

      if (response.data.err) {
        console.log(response.data.erro)
        alert('Empresa já existe')
      }

      if (response.status === 200) {
        console.log(response.data)
        alert('Empresa Cadastrada com Sucesso !')
        document.getElementById("form").reset();
        document.location.reload();

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
  var x = document.getElementById("Select").selectedIndex;
  var y = document.getElementById("Select").options;
  var empresaBusca = y[x].text
  const campos = document.getElementById('campos')
  
  if (!x == 0) {
    await axios.get("/empresa/" + empresaBusca, config)

      .then(function (response) {
        imgAltera.disabled = false
        campos.disabled = false
        empresaAltera.value = response.data.empresa
        linkbiAltera.value = response.data.bi
        id = response.data.id
        sessionStorage.setItem('idEmpresa', id)
        document.getElementById("imageAltera").src = response.data.url
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
}

// FUNÇÃO QUE ALTERA O USUARIO DA PESQUISA
async function alteraEmpresa() {
  event.preventDefault()
  var x = document.getElementById("Select").selectedIndex;
  var y = document.getElementById("Select").options;
  var empresaBusca = y[x].text
  const campos = document.getElementById('campos')
  const empresaAltera = document.getElementById('empresaAltera').value
  const linkbiAltera = document.getElementById('linkbiAltera').value
  const imgAltera = document.getElementById('imgAltera').files[0]
  var urlAltera = url

  if (!imgAltera == '') {

    await axios.delete("/files/" + urlID, config)

      .then(function (response) {

      })
      .catch(function (error) {
        console.log(error)
        return alert("Houve um problema, verificar log !")

      })

    let dataAltera = new FormData()
    dataAltera.append("file", imgAltera)

    //CHECA SE FOI FEITO ALTERAÇÃO NA IMG
    // SE ALTERADO, ASSUME A NOVA URL E ID


    await axios.post('/files', dataAltera, config)

      .then(function (response) {
        urlAltera = response.data.url
        urlID = response.data.id


      }).catch(function (err) {
        alert("Verificar log")
        console.log(err)

      });

  }
  console.log(urlID)
  await axios.put("/empresa", {
      "empresa": `${empresaAltera}`,
      "bi": `${linkbiAltera}`,
      "url": urlAltera,
      "urlID": urlID,
      "id": sessionStorage.getItem('idEmpresa')
    }, config)

    .then(function (response) {
      alert("Empresa alterada com sucesso !")
      campos.disabled = true
      document.getElementById("formBusca").reset()
      document.getElementById("formAltera").reset()
      sessionStorage.removeItem('id')
      campos.disabled = true
      limparCampos()
      document.location.reload();

    })
    .catch(function (error) {
      console.log(error)
      alert("Não foi possivel alterar este cadastro")
    })
}

async function excluirEmpresa() {
  event.preventDefault()
  var x = document.getElementById("Select").selectedIndex;
  var y = document.getElementById("Select").options;
  var empresaBusca = y[x].text

  await axios.delete("/files/" + urlID, config)

    .then(function (response) {

    })
    .catch(function (error) {

      console.log(error)
      alert("Verificar log")

    })


  if (!x == 0) {
    await axios.delete("/empresa/" + empresaBusca, config)

      .then(function (response) {
        alert("Empresa excluida com sucesso !")
        campos.disabled = true
        document.getElementById("formBusca").reset();
        document.getElementById("formAltera").reset();
        document.location.reload();

      })
      .catch(function (error) {
        alert("Não foi possivel excluir")

      })
  }
}

function atualizaTabela() {
  $('#teste').DataTable().ajax.reload();
}

function mostrarTabela() {
  $(document).ready(function () {
    $('#teste').DataTable({
      "ajax": {
        "url": '../empresa',
        "type": "GET",
        "beforeSend": function (xhr) {
          xhr.setRequestHeader("Authorization",
            "Bearer " + token)
        }
      },

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
  $('#teste').DataTable({
    responsive: true
  })
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
  const campos = document.getElementById('campos')
  campos.disa
  document.getElementById("form").reset();
  document.getElementById("formBusca").reset();
  document.getElementById("formAltera").reset();
  document.getElementById("imageNovo").src = "https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg"
  document.getElementById("imageAltera").src = "https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg"
}
mostrarTabela()
