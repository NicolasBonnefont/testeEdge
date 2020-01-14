'use strict'
/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const User = use('App/Models/User')

const crypto = require('crypto')
const moment = require('moment')

const Mail = use('Mail')

class ForgotPasswordController {
  async store({request,response}){

    try {
      const email = request.input('email')
    
      const user = await User.findByOrFail('email', email)
  
      user.token = crypto.randomBytes(10).toString('hex')
  
      user.token_created_at = new Date()
  
      await user.save()

      await Mail.send(
        ['emails.forgot_password'],
        {email, token: user.token, link:`${request.input('redirect_url')}?token=${user.token} `},
        message =>{
          message
          .to(user.email)
          .from('suporte@morinfo.com.br', 'Suporte', 'MorInfo')
          .subject('Recuperação de Senha')
        }        
      )
      return response.status(200).send({ok:"ok"})
      
    } catch (err) {
      
      return response.status(err.status).send({error: { message: 'Algo não deu certo! Este Email existe ?' } } )
    }
    
  }

  async update ({ request, response }){
    try{
     
      const {token, password} = request.all()

      const user = await User.findByOrFail('token',token)
        // =moment() cria a data atual
      const tokenExpired = moment().subtract('2','days').isAfter(user.token_created_at)

      if(tokenExpired){
        return response.status(401).send({error: {messagem: 'O token de recuperação esta expirado !'}})

      }
      user.token = null;
      user.token_created_at = null; 
      user.password = password;

      await user.save()

      return response.status(200).send({ok:"ok"})


    }catch (err){
      return response.status(err.status).send({error: {messagem: 'Algo não deu certo! esse e-mail existe?'}})

    }
  }
}

module.exports = ForgotPasswordController
