'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Painel = use('App/Models/Painel')
const Empresa = use('App/Models/Empresa')
const User = use('App/Models/User')
const Database = use('Database')

class PainelController {
 
  async index ({ request, response }) {
    const data = await Painel.all()

    return {data}   
 
  }

  async create ({ request, response }) {
  }

  async store ({ request, response }) {
    try{
      const data = request.all()

      const {empresa} = await Empresa.findByOrFail('id',data.idEmpresa)

      const painel = await Painel.create(data)
  
      painel.merge({"descricaoEmpresa": empresa});
      return painel
  
     } 
     catch(err){
  
      return response.status(200).send({error: { message: 'Algo não deu certo!' } } )
  
     }    
  }

  // MOSTRAR 1 PAINEL PELO O ID 
  async showPainel ({ params, request, response }) {

    const painel = await Painel.find(params.id)

    return painel
  }

  // MOSTRAR TODOS OS PAINEIS POR ID EMPRESA
  async show ({ params, request, response }) {
    
    // BUSCAR O PAINEL POR EMPRESA

    const {idEmpresa} = await request.all()

    const painel = await Painel.query().where('idEmpresa', '=', idEmpresa).fetch()
    
    return painel
  }


// BUSCAR O PAINEL POR ID DO USUARIO
  async showUsuario ({ params, request, response }) {
        
    const {id} = await request.all()

    const painel = await Database
    .table('painels')
    .innerJoin('empresas', function () {
      this
        .on('empresas.id', 'painels.idEmpresa')
    })
    .innerJoin('users', function () {
      this
        .on('users.idPainel', 'painels.id')
    })
    .where('users.id', id)

    return painel[0]
  }

  //retorna as info do painel
  async idPainel({ params, request, response }){

    const {idEmpresa, descricao} = await request.all()

    
    const painel = await Painel.query().where('idEmpresa', '=', idEmpresa)
    .andWhere('descricao', '=', descricao ).fetch()
    
    return painel
  }


  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
    try{
  
      const data = request.all()

      const painel = await Painel.findByOrFail('id', params.id)

      const {empresa} = await Empresa.findByOrFail('id',data.idEmpresa)     
     
      painel.merge(data);

      painel.merge({"descricaoEmpresa": empresa})

      await painel.save();

      return painel    

    }catch (err){

      return response.status(err.status).send({error: { message: 'Algo não deu certo!' } } )
      

    }    
  }

  async destroy ({ params, request, response }) {
    console.log(params.id)
    const painel = await Painel.findByOrFail('id',params.id)
    
    await painel.delete()
     
    return response.status(200).send({ok:'Deletado com sucesso'})    
  }
}

module.exports = PainelController
