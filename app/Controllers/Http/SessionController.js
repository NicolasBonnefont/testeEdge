'use strict'
const User = use('App/Models/User')
const Empresa = use('App/Models/Empresa')

class SessionController {
  async store ({request, response, auth}){

    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

     //retorna usuario e token
     
    if (token){

      const user = await User.findByOrFail('email', email)
      
      const {empresa} = await User.findByOrFail('email',email)

      const empresas = await Empresa.findBy('empresa',empresa)
      
      if (empresas){
        return {token, user, empresas}
      }
     
      return{token, user}
    }
}
}
module.exports = SessionController
