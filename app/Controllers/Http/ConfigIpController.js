'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Ip = use('App/Models/ConfigIp')
class ConfigIpController {
 
  async index ({ request, response, view }) {
    const ip = await Ip.all()

    return {ip}    
  }

  async create ({ request, response, view }) {
  }

  async store ({ request, response }) {
    try{
      const data = request.all()
  
      const ip = await Ip.create(data)
  
      return ip
  
     } 
     catch(err){
  
      return response.status(200).send({error: { message: 'Algo não deu certo!' } } )
  
     }    
  }


  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
    try{

      const {ipBusca} = request.all()

      const ip = await Ip.findByOrFail('ip', ipBusca)
      const data = request.all()
    
      ip.merge(data);
      await ip.save();

      return ip
    

    }catch (err){

      return response.status(err.status).send({error: { message: 'Algo não deu certo!' } } )
      

    }    
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = ConfigIpController
