'use strict'

const User = use('App/Models/User')
const Empresa = use('App/Models/Empresa')

class UserController {
  async store({request, response}){

   try{
    const data = request.all()

    const user = await User.create(data)

    return user

   } 
   catch(err){

    return response.status(200).send({error: { message: 'Algo não deu certo!' }, err } )

   }

  }

  async update({ request, response }) {
    try{

      const {username} = request.all()

      const user = await User.findByOrFail('username', username)
      const data = request.all()
    
      user.merge(data);
      await user.save();

      return user
    

    }catch (err){

      return response.status(err.status).send({error: { message: 'Algo não deu certo!' } } )
      

    }
  }

  async show ({ request,params }){

    const {username} = request.all(params)

    const user = await User.findByOrFail('username', username)

    return user
  }

  async destroy ({ params,  response, request }) {
    const {username} = request.all(params)
   
    const user = await User.findByOrFail('username', username)
    
    await user.delete()
     
    return response.status(200).send({ok:'Deletado com sucesso'})
  }

  async index({response}){

    const data = await User.all()

    return {data}
  }

  async acesso({response, auth}){

    const usuario = await auth.getUser()
      
    const {empresa} = await auth.getUser()
    
    const empresas = await Empresa.findBy('empresa',empresa)
   
    try {
      return {usuario,empresas}
    } catch (error) {
      response.send('Missing or invalid jwt token')
    }
  }

}

module.exports = UserController
