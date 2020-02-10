'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with setors
 */
const Setor = use('App/Models/Setor')
const Empresa = use('App/Models/Empresa')

class SetorController {
  /**
   * Show a list of all setors.
   * GET setors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const data = await Setor.all()

    return {data}  
  }

  /**
   * Render a form to be used for creating a new setor.
   * GET setors/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new setor.
   * POST setors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {       
    try{
      

      const data = request.all()
      
      const {empresa} = await Empresa.findByOrFail('id',data.idEmpresa)

    
      const setor = await Setor.create(data)
      
      setor.merge({"descricaoEmpresa": empresa});
      await setor.save();
      
      return setor
     } 
    catch(err){
  
      return response.status(200).send({error: { message: 'Algo não deu certo!' }, err } )
  
     } 



  }

  /**
   * Display a single setor.
   * GET setors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try{
          
       const setor = await Setor.query().where('idEmpresa', '=', params.id).fetch()
     
      return setor
    
    }catch (err){

      return response.status(200).send({error: { message: 'Algo não deu certo!' }, err } )
    
    }

  }

  async showDescricao ({ params, request, response, view }) {
    try{
          
       const {idEmpresa, descricao} = await request.all()
       const setor = await Setor.query().where('idEmpresa', '=', idEmpresa)
       .andWhere('descricao', '=', descricao).fetch()
     
      return JSON.stringify(setor)
    
    }catch (err){

      return response.status(200).send({error: { message: 'Algo não deu certo!' }, err } )
    
    }

  }

  /**
   * Render a form to update an existing setor.
   * GET setors/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update setor details.
   * PUT or PATCH setors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try{
      
      const data = request.all()

      const setor = await Setor.findByOrFail('id', params.id)

      const {empresa} = await Empresa.findByOrFail('id',data.idEmpresa)
  
      setor.merge(data);

      setor.merge({"descricaoEmpresa": empresa})    
      
      await setor.save();  

      return setor
    
    }catch (err){

      return response.status(200).send({error: { message: 'Algo não deu certo!' }, err } )
      

    }
  }

  /**
   * Delete a setor with id.
   * DELETE setors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    try{

    const setor = await Setor.findByOrFail('id',params.id)
    
    await setor.delete()
     
    return response.status(200).send({ok:'Deletado com sucesso'}) 

    }
    catch(err){
      return response.status(200).send({error: { message: 'Algo não deu certo!' }, err } )

    }
  }
}

module.exports = SetorController
