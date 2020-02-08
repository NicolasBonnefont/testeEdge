'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')
const Empresa = use('App/Models/Empresa')
const Database = use('Database')
const Notificacao = use('App/Models/Notificacao')


class NotificacaoController {

  
  async index ({ request, response, view }) {


    const {userRecebe,empresa,departamento} = request.all()

    const notificacao = await Database.raw(`select * from notificacaos
      where userRecebe = '${userRecebe}'
      and empresa = '${empresa}' 
      and departamento ='${departamento}'` )
      
     Database.close()
     const notificacoes = notificacao[0]
    return {notificacoes}
  }


  async store ({ request, response }) {
  
  try{
    const data = request.all()
    
    const notificacao = await Notificacao.create(data)

    return notificacao

   } 
   catch(err){

    return err

  }
}

  async update ({ params, request, response }) {
    try{

      const {id} = request.all()
      
      const notificacao = await Notificacao.findByOrFail('id', id)

      const data = request.all()
      
      notificacao.merge(data);
      
      await notificacao.save();
      
      return notificacao
    

    }catch (err){

      return response.status(err.status).send({error: { message: 'Algo não deu certo!' } } )
      

    }    
  }

}

module.exports = NotificacaoController
