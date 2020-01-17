'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


// ROTAS PARA AS VIEWS
Route.on('/').render('home')
Route.on('/home').render('home')
Route.on('/resetpassword').render('resetpassword')
Route.on('/esqueciasenha').render('esqueciasenha')
Route.on('/pag/cadastroEmpresa').render('pag/cadastroEmpresa')
Route.on('/pag/cadastroUsuario').render('pag/cadastroUsuario')
Route.on('/pag/dashboard').render('pag/dashboard')
Route.on('/pag/principal').render('pag/principal')
Route.on('/pag/perfil').render('pag/perfil')
Route.on('/pag/configuracaoIp').render('pag/configuracaoIp')


// rotas para as API
Route.get('users/:username', 'UserController.show')
Route.get('users', 'UserController.index')
Route.delete('users/:username', 'UserController.destroy')
Route.put('users','UserController.update')
Route.post('users','UserController.store')

Route.post('sessions','SessionController.store')

Route.post('passwords','ForgotPasswordController.store')
Route.put('passwords','ForgotPasswordController.update')

Route.post('empresa','EmpresaController.store')
Route.get('empresa/:empresa','EmpresaController.show')
Route.put('empresa','EmpresaController.update')
Route.delete('empresa/:empresa','EmpresaController.destroy')
Route.get('empresa','EmpresaController.index')

Route.post('files', 'FileController.store')
Route.get('files/:id', 'FileController.show')
Route.delete('files/:id', 'FileController.destroy')

Route.post('notificacao', 'NotificacaoController.store')
Route.get('notificacao',"NotificacaoController.index")
Route.put('notificacao',"NotificacaoController.update")

Route.put('ip',"ConfigIpController.update")
Route.get('ip/:local',"ConfigIpController.show")
Route.delete('ip/:local',"ConfigIpController.destroy")
Route.get('ip',"ConfigIpController.index")
Route.post('ip',"ConfigIpController.store")


Route.on('*').render('404')
