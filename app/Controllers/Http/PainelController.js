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
      await painel.save();
      
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

    const data = await Painel.query().where('idEmpresa', '=', params.id).fetch()
    
    return {data}
  }

// BUSCAR O PAINEL POR ID DO USUARIO
  async showUsuario ({ params, request, response }) {
            
    const verifica = await User.findByOrFail('id', params.id)
    console.log(verifica)
    if( verifica.admin === 1 ){

      const data = await Painel.all()

      return {data}
  }

    if (verifica.gestor === 1){

      const data = await Database
      .table('painels  ')
      .innerJoin('empresas ', function () {
        this
          .on('empresas.id', 'painels.idEmpresa')
      })
      .where('empresas.empresa', '=', verifica.empresa)
    
      
      return {data}
    }

    const data = await Database
    .table('painels  ')
    .innerJoin('usuarios_painels ', function () {
      this
        .on('painels.id', 'usuarios_painels.idPainel')
    })
    .innerJoin('users', function () {
      this
        .on('users.id', 'idUsuario')
    })
    .where('usuarios_painels.idUsuario', '=', params.id)
  
    return {data}

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
    
    const painel = await Painel.findByOrFail('id',params.id)
    
    await painel.delete()
     
    return response.status(200).send({ok:'Deletado com sucesso'})    
  }
}

module.exports = PainelController
