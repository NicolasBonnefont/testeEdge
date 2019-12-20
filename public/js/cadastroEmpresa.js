var url = 'https://api-mor.herokuapp.com'

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
      const id = response.data.id
      sessionStorage.setItem('idEmpresa', id)
      console.log(empresaBusca)
    })
    .catch(function (error) {
      alert("Empresa não encotrada")
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
  const id = sessionStorage.getItem('idEmpresa')


  await axios.put("/empresa", {
    "empresa": `${empresaAltera}`,
    "bi": `${linkbiAltera}`,
    "id": id
  })

    .then(function (response) {
      alert("Empresa alterada com sucesso !")
      campos.disabled = true
      document.getElementById("formBusca").reset();
      document.getElementById("formAltera").reset();
      sessionStorage.removeItem('id')

    })
    .catch(function (error) {
      alert("Não foi possivel alterar este cadastro")
    })
}

async function excluirEmpresa() {
  event.preventDefault()

  const empresaAltera = document.getElementById('usuarioAltera').value
  await axios.delet("/empresa/" + empresaAltera)

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

mostrarTabela()
