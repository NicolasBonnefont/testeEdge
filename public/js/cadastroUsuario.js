async function carregaUsuario() {
  var dados

  await axios.get('/users', config)
    .then(function (response) {
      dados = response.data.data
    })
    .catch(function (error) { })

  for (var i = 0; i < dados.length; i++) {
    var select = document.getElementById("Select")
    var option = document.createElement("option")
    option.text = dados[i].username;
    select.add(option);
  }
}


async function carregaEmpresa() {
  var dadosEmpresa
  console.log(' ? ? ? ?')
  await axios.get('/empresas', config)
    .then(function (response) {
      dadosEmpresa = response.data.data
    })
    .catch(function (error) { })

  for (var i = 0; i < dadosEmpresa.length; i++) {
    var SelectEmpresa = document.getElementById("SelectEmpresa")
    var optionEmpresa = document.createElement("option")
    optionEmpresa.text = dadosEmpresa[i].empresa;
    SelectEmpresa.add(optionEmpresa);
  }
  for (var i = 0; i < dadosEmpresa.length; i++) {
    var SelectAltera = document.getElementById("selectEmpresaAltera")
    var optionEmpresaAltera = document.createElement("option")
    optionEmpresaAltera.text = dadosEmpresa[i].empresa;
    SelectAltera.add(optionEmpresaAltera);
  }
}




async function carregaIdPainel() {
  // carrega o id do painel conforme os campos da empresa e o dash escolhido

  var painelBusca = ''
  sessionStorage.setItem('idPainel', '')

  var x = document.getElementById("selectPainelAltera").selectedIndex;
  var y = document.getElementById("selectPainelAltera").options;
  painelBusca = y[x].text

  await axios.post('/carregaIdPainel', {
    "idEmpresa": sessionStorage.getItem('idEmpresa'),
    "descricao": painelBusca
  }, config)
    .then(function (response) {
      sessionStorage.setItem('idPainel', response.data[0].id)
      sessionStorage.setItem('descricaoPainel', response.data[0].Descricao)


    })
    .catch(function (error) {
      console.log(error)
    })

}


// FUNCAO QUE CRIA USUARIO
async function cadastraUsuario() {
  event.preventDefault()


  var x = document.getElementById("SelectEmpresa").selectedIndex;
  var y = document.getElementById("SelectEmpresa").options;
  var empresaCadastra = y[x].text

  const username = document.getElementById('username').value;
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value
  const email = document.getElementById('email').value
  const admin = document.getElementById('admin')
  const gestor = document.getElementById('gestor')
  const imgNovo = document.getElementById('imgNovo').files[0]

  var url = ''
  var adminOK = 0
  var gestorOK = 0

  let data = new FormData()
  data.append("file", imgNovo)

  if (admin.checked) {
    adminOK = 1
  } else {
    adminOK = 0
  }

  if (gestor.checked) {
    gestorOK = 1
  } else {
    gestorOK = 0
  }

  await axios.post('/files', data, configMultipart)

    .then(function (response) {
      url = response.data.url

    }).catch(function (err) {

      console.log(err)

    });
  try {
    await axios.post('/users', {
      "username": `${username}`,
      "name": `${name}`,
      "password": `${password}`,
      "email": `${email}`,
      "empresa": `${empresaCadastra}`,
      "admin": `${adminOK}`,
      "gestor": `${gestorOK}`,
      "url": url
    }, config)

      .then(function (response) {
        id = sessionStorage.setItem('idAtualiza', response.data.id)

      })
      .catch(function (error) {
        alert("Verificar log")
        console.log(error)


      })


    var local = sessionStorage.getItem('idPainel')
    var dados = JSON.parse(local)
    var idPainel = [...dados]

    await axios.post('/painelUsuario', {
      "idUsuario": sessionStorage.getItem('idAtualiza'),
      "idPainel": idPainel
    }, config)
      .then(function (response) {
        alert('Usuario Cadastrado com Sucesso !')
        limparCampos()
      })
      .catch(function (err) {
        console.log(err)
      })
  } catch (err) {
    console.log(err)
  }

}

async function igualaPainelAltera() {

  // traz os dashs conforme a empresa selecionada

  document.querySelectorAll('#checkboxAltera div').forEach(div => div.remove())
  var empresaBusca = ''

  var x = document.getElementById("selectEmpresaAltera").selectedIndex;
  var y = document.getElementById("selectEmpresaAltera").options;
  empresaBusca = y[x].text

  //so entra na funcao de pesquisa se for diferente ao selecione a empresa
  if (!(empresaBusca == "Selecione a Empresa")) {

    await axios.post('/empresas', {
      "empresa": empresaBusca
    }, config)
      .then(function (response) {
        sessionStorage.setItem('idEmpresa', response.data.id)
      })
      .catch(function (error) {

      })

    await axios.get('/painelEmpresa/' + sessionStorage.getItem('idEmpresa'), config)

      .then(function (response) {
        dados = { ...response.data.data }
        for (var i = 0; i < response.data.data.length; i++) {

          var node = document.createElement('div')

          node.innerHTML = '<div class="col-sm-12 align-items-center"><label class="form-check"><input class="form-check-input objs" type="checkbox" value="' +
          response.data.data[i].id + '">' +
          response.data.data[i].Descricao + '<span class="form-check-sign"><span class="check"></span></span></label></div>'
          document.getElementById('checkboxAltera').appendChild(node);

        }

        window.sessionStorage.setItem('idEmpresa', idEmpresa)

      })
      .catch(function (error) {

      })

    await axios.get('/painelUsuario/' + sessionStorage.getItem('id'), config)
      .then(function (response) {
        var inputs = document.querySelectorAll(".objs")

        var count1 = 0
        var count2 = 0

        while (count1 < inputs.length - 1) { 

          while (count2 < response.data.painel.length) {           

            if (inputs[count1].value == response.data.painel[count2].idPainel) {

              inputs[count1].checked = true

              count2++

            }
            count1++
          }
          count+1
        }

      })
  }
}

async function igualaPainelCadastro() {

  document.querySelectorAll('#checkbox div').forEach(div => div.remove())
  var empresaBusca = ''

  var x = document.getElementById("SelectEmpresa").selectedIndex;
  var y = document.getElementById("SelectEmpresa").options;
  empresaBusca = y[x].text

  //so entra na funcao de pesquisa se for diferente ao selecione a empresa
  if (!(empresaBusca == "Selecione a Empresa")) {

    await axios.post('/empresas', {
      "empresa": empresaBusca
    }, config)
      .then(function (response) {
        sessionStorage.setItem('idEmpresa', response.data.id)
      })
      .catch(function (error) { })

    await axios.get('/painelEmpresa/' + sessionStorage.getItem('idEmpresa'), config)

      .then(function (response) {
        for (var i = 0; i < response.data.data.length; i++) {

          var node = document.createElement('div')

          node.innerHTML = '<div class="col-sm-12 align-items-center"><label class="form-check"><input class="form-check-input objs" type="checkbox" value="' +
            response.data.data[i].id + '">' +
            response.data.data[i].Descricao + '<span class="form-check-sign"><span class="check"></span></span></label></div>'
          document.getElementById('checkbox').appendChild(node);

        }

        window.sessionStorage.setItem('idEmpresa', idEmpresa)

      })
      .catch(function (error) {

      })

  }
}

// FUNCAO QUE BUSCA O USUARIO
async function buscarUsuario() {
  event.preventDefault()



  // SELECT REFERENTE A BUSCA DE EMPRESA
  var a = document.getElementById("selectEmpresaAltera").selectedIndex;
  var b = document.getElementById("selectEmpresaAltera").options;



  // SELECT REFERENTE A BUSCA DE USUARIO
  var x = document.getElementById("Select").selectedIndex;
  var y = document.getElementById("Select").options;
  var usuarioBusca = y[x].text

  const campos = document.getElementById('campos')
  var imgAltera = document.getElementById('imgAltera')

  if (!x == 0) {
    await axios.post('/user', {
      'username': `${usuarioBusca}`
    }, config)

      .then(function (response) {
        sessionStorage.setItem('id', response.data.id)

        campos.disabled = false

        usuarioAltera.value = response.data.name
        emailAltera.value = response.data.email

        b[0].text = response.data.empresa

        adminAltera.value = response.data.admin
        gestorAltera.value = response.data.gestor

        document.getElementById("imageAltera").src = response.data.url
        urlID = response.data.urlID
        url = response.data.url
        imgAltera.disabled = false


        if (adminAltera.value == 1) {
          adminAltera.checked = true
        } else {
          adminAltera.checked = false
        }

        if (gestorAltera.value == 1) {
          gestorAltera.checked = true
        } else {
          gestorAltera.checked = false
        }

      }, config)

      .catch(function (error) {
        console.log(error)
        alert("Usuario não encotrado, verificar log.")
        limparCampos()

      })

    igualaPainelAltera()


  }

}
// FUNÇÃO QUE ALTERA O USUARIO DA PESQUISA



async function alterarUsuario() {
  event.preventDefault()

  var x = document.getElementById("Select").selectedIndex;
  var y = document.getElementById("Select").options;
  var usuarioBusca = y[x].text

  var painelAltera = ''
  var empresaAltera = ''

  if (!(document.getElementById("selectEmpresaAltera").selectedIndex == -1)) {
    var a = document.getElementById("selectEmpresaAltera").selectedIndex;
    var b = document.getElementById("selectEmpresaAltera").options;
    empresaAltera = b[a].text
  }

  if (!(document.getElementById("selectPainelAltera").selectedIndex == -1)) {
    var a = document.getElementById("selectPainelAltera").selectedIndex;
    var b = document.getElementById("selectPainelAltera").options;
    painelAltera = b[a].text
  }


  console.log(a)

  const campos = document.getElementById('campos')
  const emailAltera = document.getElementById('emailAltera').value
  const imgAltera = document.getElementById('imgAltera').files[0]
  const adminAltera = document.getElementById('adminAltera')
  const gestorAltera = document.getElementById('gestorAltera')
  const usuarioAltera = document.getElementById('usuarioAltera').value

  var adminAlteraOK = 0
  var gestorAlteraOK = 0
  var urlAltera = url


  if (adminAltera.checked) {

    adminAlteraOK = 1
  }
  if (gestorAltera.checked) {

    gestorAlteraOK = 1
  }

  if (!imgAltera == '') {

    await axios.delete("/files/" + urlID, configMultipart)

      .then(function (response) {

      })
      .catch(function (error) {
        console.log(error)
        return alert("Houve um problema !")
      })



    let dataAltera = new FormData()
    dataAltera.append("file", imgAltera)

    //CHECA SE FOI FEITO ALTERAÇÃO NA IMG
    // SE ALTERADO, ASSUME A NOVA URL E ID


    await axios.post('/files', dataAltera, configMultipart)

      .then(function (response) {
        urlAltera = response.data.url
        urlID = response.data.id


      }).catch(function (err) {

        console.log(err)

      });

  }

  await axios.put('/users', {
    "name": `${usuarioAltera}`,
    "email": `${emailAltera}`,
    "username": `${usuarioBusca}`,
    "empresa": `${empresaAltera}`,
    "admin": `${adminAlteraOK}`,
    "gestor": `${gestorAlteraOK}`,
    "url": urlAltera,
    "urlID": urlID
  }, config)

    .then(function (response) {

      urlUsuario = urlAltera
      urlIdUsuario = urlID
      alert("Usuário alterado com sucesso !")
      campos.disabled = true
      limparCampos()
      location.reload();

    })
    .catch(function (error) {

      console.log(error)
      alert("Não foi possivel alterar este cadastro, verificar log")

    })

}

async function excluirUsuario() {
  event.preventDefault()
  var x = document.getElementById("Select").selectedIndex;
  var y = document.getElementById("Select").options;
  var usuarioBusca = y[x].text
  const campos = document.getElementById('campos')


  await axios.delete("/files/" + urlID, configMultipart)

    .then(function (response) {

      console.log(response)

    })
    .catch(function (error) {

      console.log(error)

    })

  if (!x == 0) {

    await axios.post('/userDelete', {
      'username': `${usuarioBusca}`
    }, config)

      .then(function (response) {
        console.log(usuarioBusca)
        alert("Usuário excluido com sucesso !")
        limparCampos()
      })
      .catch(function (error) {
        console.log(error)
        campos.disabled = true
        alert("Não foi possivel excluir este cadastro, verificar log")
        document.getElementById("formBusca").reset();
        document.getElementById("formAltera").reset();
      })

  }
}

// FUNCAO QUE REMOVE O EVENTO PADRAO DE SUBMIT DO BOTAO

// FUNCAO 
function atualizaTabela() {
  $('#teste').DataTable().ajax.reload();
}

function mostrarTabela() {

  $(document).ready(function () {

    $('#teste').DataTable({

      "ajax": {
        "url": '../users',
        "type": "GET",
        "beforeSend": function (xhr) {
          xhr.setRequestHeader("Authorization",
            "Bearer " + token)
        }
      },

      "columns": [{
        "data": "name"
      },
      {
        "data": "email"
      },
      {
        "data": "empresa"
      },

      ],
      "language": idioma,
      dom: 'Bfrtip',
      buttons: [
        'copyHtml5',
        'excelHtml5',
        'pdfHtml5',
        'print'

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

function limparCampos() {
  document.getElementById("form").reset();
  document.getElementById("formBusca").reset();
  document.getElementById("formAltera").reset();
  document.getElementById("imageNovo").src = "https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg"
  document.getElementById("imageAltera").src = "https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg"
  document.getElementById("imgAltera").disabled = true
  document.getElementById("campos").disabled = true
  sessionStorage.setItem('idEmpresa', '')
  sessionStorage.setItem('idPainel', '')
  sessionStorage.setItem('idAtualiza', '')
  sessionStorage.setItem('descricaoPainel', '')
  document.querySelectorAll('#checkbox div').forEach(div => div.remove())
  document.querySelectorAll('#checkboxAltera div').forEach(div => div.remove())



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


function mudaCheckbox() {
  var idPainel = Array.from(document.querySelectorAll(".objs:checked"))
    .map(function (checkbox) {
      return checkbox.value
    })

  sessionStorage.setItem('idPainel', JSON.stringify(idPainel))

}


carregaEmpresa()
carregaUsuario()
mostrarTabela()
limparCampos()
