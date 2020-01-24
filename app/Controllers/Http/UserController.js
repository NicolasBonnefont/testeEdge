'use strict'

const User = use('App/Models/User')

class UserController {
  async store({request, response}){

   try{
    const data = request.all()

    const user = await User.create(data)

    return user

   } 
   catch(err){

    return response.status(200).send({error: { message: 'Algo não deu certo!' } } )

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

  async show ({ params }){

    const {username} = request.all(params)
      
    const user = await User.findByOrFail('username', username)

    return user
  }

  async destroy ({ params, request, response }) {
    const user = await User.findByOrFail(params)
    await user.delete()
     
    return response.status(200).send({ok:'Deletado com sucesso'})
  }

  async index({response}){

    const data = await User.all()

    return {data}
  }


}

module.exports = UserController
