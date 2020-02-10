

function mostrarTabela() {

  $(document).ready(function () {

    $('#teste').DataTable({

      "ajax": {
        "url": '/painel',
        "type": "GET",
        "beforeSend": function (xhr) {
          xhr.setRequestHeader("Authorization",
            "Bearer " + token)
        }
      },

      "columns": [
      {
        "data": "descricaoEmpresa"
      },
        {
        "data": "Setor"
      },
      {
        "data": "Descricao"
      },
      { "data": "Link",
        "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
            $(nTd).html("<a href='/pag/dashboard?dash="+oData.Link+"'>"+oData.Descricao+"</a>");
        }
    },


      ],
      "language": idioma,
      dom: 'Bfrtip',
      buttons: []

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
