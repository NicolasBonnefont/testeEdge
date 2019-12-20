'use strict'

const Empresa = use('App/Models/Empresa')

class EmpresaController {

  async index ({ request, response, view }) {
    const data = await Empresa.all()

    return {data}
  }

  async create ({ request  }) {

 }

  async store ({ request, response }) {

    const data = request.all()

    const empresas = await Empresa.create(data)

    return empresas  
  
   
  }
  

  async show ({ params, request, response }) {
    const empresa = await Empresa.findByOrFail(params)

     
    return empresa
  }


  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
    const {id} = request.all()

    const empresas = await Empresa.findByOrFail('id', id)
    const data = request.only(["empresa", "bi"]);
  
    empresas.merge(data);
    await empresas.save();

    return empresas

  }


  async destroy ({ params, request, response }) {
    const empresa = await Empresa.findByOrFail(params)
    await empresa.delete()
     
    return response.status(200).send({ok:'Deletado com sucesso'})
  }
}

module.exports = EmpresaController
