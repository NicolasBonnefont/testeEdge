'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


// ROTAS PARA AS VIEWS
Route.on('/').render('home')
Route.on('/home').render('home')
Route.on('/resetpassword').render('resetpassword')
Route.on('/esqueciasenha').render('esqueciasenha')
Route.on('/pag/cadastroEmpresa').render('pag/cadastroEmpresa')
Route.on('/pag/cadastroPainel').render('pag/cadastroPainel')
Route.on('/pag/cadastroUsuario').render('pag/cadastroUsuario')
Route.on('/pag/dashboard').render('pag/dashboard')
Route.on('/pag/principal').render('pag/principal')
Route.on('/pag/perfil').render('pag/perfil')
Route.on('/pag/configuracaoIp').render('pag/configuracaoIp')

// rotas para as API
Route.post('sessions','SessionController.store')
Route.post('passwords','ForgotPasswordController.store')
Route.put('passwords','ForgotPasswordController.update')

Route.put('ip',"ConfigIpController.update")
Route.get('ip/:local',"ConfigIpController.show")
Route.delete('ip/:local',"ConfigIpController.destroy")
Route.get('ip',"ConfigIpController.index")
Route.post('ip',"ConfigIpController.store")


Route.get('files/:id', 'FileController.show')



// GRUPO DE ROTAS PERMITIDAS SOMENTE QUANDO O USUARIO ESTIVER LOGADO


Route.group(() => {

Route.get('acesso','UserController.acesso')

Route.post('files', 'FileController.store')
Route.delete('files/:id', 'FileController.destroy')

Route.get('users', 'UserController.index')
Route.post('user', 'UserController.show')
Route.post('userDelete', 'UserController.destroy')
Route.put('users','UserController.update')
Route.post('users','UserController.store')

Route.get('painel', 'PainelController.index')
Route.post('painelEmpresa', 'PainelController.show')
Route.post('painelCarrega', 'PainelController.showUsuario')
Route.post('painelDelete', 'PainelController.destroy')
Route.put('painel','PainelController.update')
Route.post('painel','PainelController.store')
Route.put('painelAltera','PainelController.update')


Route.post('empresa','EmpresaController.store')
Route.post('empresas','EmpresaController.show')
Route.get('empresas','EmpresaController.index')

Route.put('empresa','EmpresaController.update')
Route.post('empresaDelete','EmpresaController.destroy')



Route.post('notificacao', 'NotificacaoController.store')
Route.get('notificacao',"NotificacaoController.index")
Route.put('notificacao',"NotificacaoController.update")



}).middleware('auth') // FUNÇÃO QUE REQUER AS ROTAS AUTENTICADAS 

// ROTA CORINGA PARA MOSTRAR CASO NAO ENCONTRE AS DEMAIS
Route.on('*').render('pag/404') 
