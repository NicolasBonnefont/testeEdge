// FUNCAO QUE CRIA USUARIO
async function cadastraUsuario() {

  event.preventDefault()

  const username = document.getElementById('username').value;
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value
  const email = document.getElementById('email').value
  const empresa = document.getElementById('empresa').value
  const admin = document.getElementById('admin')
  var adminOK = 0

  if(admin.checked){
   adminOK = 1
  }else{
    adminOK = 0
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
      
      console.log(usuarioBusca)
      campos.disabled = false

      usuarioAltera.value = response.data.name
      emailAltera.value = response.data.email
      empresaAltera.value = response.data.empresa
      adminAltera.value =  response.data.admin
      
      if ( adminAltera.value == 1){
        adminAltera.checked = true
      }else{
        adminAltera.checked = false
      }
     

    })
    .catch(function (error) {
      console.log(error)
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
  const adminAltera = document.getElementById('adminAltera')
  var adminAlteraOK = 0
  console.log(adminAltera.checked)
  if(adminAltera.checked){
    console.log('alterar para 1 ')
    adminAlteraOK = 1
  }else{
    console.log('alterar para 0 ')
    adminAlteraOK = 0
  }


  await axios.put("/users", {
      "name": `${usuarioAltera}`,
      "email": `${emailAltera}`,
      "username": `${usuarioBusca}`,
      "empresa": `${empresaAltera}`,
      "admin":`${adminAlteraOK}`
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

function atualizaTabela(){
  $ ('#teste').DataTable().ajax.reload();
}
function mostrarTabela(){
    $(document).ready(function() {
        $('#teste').DataTable( {           
            "ajax": "../users",
            "columns": [
                { "data": "username" },
                { "data": "name" },
                { "data": "email" },
                { "data": "admin" }
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

