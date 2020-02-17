'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with usuariospainels
 */
const usuarioPainel = use('App/Models/UsuariosPainel')
const Database = use('Database')

class UsuariosPainelController {
  /**
   * Show a list of all usuariospainels.
   * GET usuariospainels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const data = usuarioPainel.all()

    return {data}
  }

  /**
   * Render a form to be used for creating a new usuariospainel.
   * GET usuariospainels/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new usuariospainel.
   * POST usuariospainels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    // up = usuarioPainel
    
    const idUsuario = request.only('idUsuario')  
    const {idPainel} = request.all()  
    
    await Database.from('usuarios_painels').where(idUsuario).delete()

    for(var i = 0; i < idPainel.length; i++){
        
      var painel =  {"idPainel": idPainel[i]}
      var data = {...painel, ...idUsuario}
      
      const up = await usuarioPainel.create(data)
 
      await up.save()
     
    }
   
    }

  /**
   * Display a single usuariospainel.
   * GET usuariospainels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    
    const painel = await Database.from('usuarios_painels')
    .where({"idUsuario":params.id})
    .orderBy('idPainel', 'asc')

    return {painel}
  }

  /**
   * Render a form to update an existing usuariospainel.
   * GET usuariospainels/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update usuariospainel details.
   * PUT or PATCH usuariospainels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
      
    const idUsuario = request.only('idUsuario')  
    const {idPainel} = request.all()
   
    await Database.from('usuarios_painels').where(idUsuario).delete()
           
    for(var i = 0; i < idPainel.length; i++){
        
      var painel =  {"idPainel": idPainel[i]}

      var data = {...painel, ...idUsuario}
      
      const up = await usuarioPainel.create(data)
 
      await up.save()
     
    }
   
  }

  /**
   * Delete a usuariospainel with id.
   * DELETE usuariospainels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    
     await Database.from('usuarios_painels').where({"idUsuario":params.id}).delete()


  }
}

module.exports = UsuariosPainelController
