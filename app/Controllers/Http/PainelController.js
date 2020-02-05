'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Painel = use('App/Models/Painel')
const Empresa = use('App/Models/Empresa')
class PainelController {
 
  async index ({ request, response, view }) {
    const data = await Painel.all()

    return {data}   
 
  }

  async create ({ request, response, view }) {
  }

  async store ({ request, response }) {
    try{
      const data = request.all()
      console.log(data)
      const painel = await Painel.create(data)
  
      return painel
  
     } 
     catch(err){
  
      return response.status(200).send({error: { message: 'Algo não deu certo!' } } )
  
     }    
  }


  async show ({ params, request, response, view }) {
    
    // BUSCAR O PAINEL POR EMPRESA

    const {idEmpresa} = await request.all()

    const painel = await Painel.query().where('idEmpresa', '=', idEmpresa).fetch()
    
    return painel
  }

  async showUsuario ({ params, request, response, view }) {
    
    // BUSCAR O PAINEL POR EMPRESA
    
    const {idEmpresa, descricao} = await request.all()

    const painel = await Painel.query().where('idEmpresa', '=', idEmpresa)
    .andWhere('descricao', '=', descricao ).fetch()
   
    return painel
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
    try{

      const {id} = request.all()
      
      const painel = await Painel.findByOrFail('id', id)

      const data = request.all()
     
      painel.merge(data);
      await painel.save();

      return painel
    

    }catch (err){

      return response.status(err.status).send({error: { message: 'Algo não deu certo!' } } )
      

    }    
  }

  async destroy ({ params, request, response }) {

    const painel = await Painel.findByOrFail(params)
    await painel.delete()
     
    return response.status(200).send({ok:'Deletado com sucesso'})    
  }
}

module.exports = PainelController
