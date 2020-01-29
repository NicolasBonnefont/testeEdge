'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Ip = use('App/Models/ConfigIp')
class ConfigIpController {
 
  async index ({ request, response, view }) {
    const data = await Ip.all()

    return {data}    
 
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
    
    const data = await Ip.findByOrFail(params)

    const {ip,local} = data

    return {local,ip} 
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
    try{

      const {local} = request.all()

      const ip = await Ip.findByOrFail('local', local)
      const data = request.all()
    
      ip.merge(data);
      await ip.save();

      return ip
    

    }catch (err){

      return response.status(err.status).send({error: { message: 'Algo não deu certo!' } } )
      

    }    
  }

  async destroy ({ params, request, response }) {
    const local = await Ip.findByOrFail(params)
    await local.delete()
     
    return response.status(200).send({ok:'Deletado com sucesso'})    
  }
}

module.exports = ConfigIpController
