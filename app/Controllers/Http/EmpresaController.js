'use strict'

const Empresa = use('App/Models/Empresa')

class EmpresaController {

  async index ({ request, response, view }) {
    const data = await Empresa.all()

    return {data}
  }

  async store ({ request }) {

    const data = request.all()

    const empresas = await Empresa.create(data)

    return empresas  
     
  }
  
  async show ({ request, response, params}) {
    
      const {empresa} = request.all(params)
      
      const empresas = await Empresa.findByOrFail('empresa', empresa)
  
      return empresas
      
  }

  async update ({ request }) {
    const {id} = request.all()

    const empresas = await Empresa.findByOrFail('id', id)
    try{
    const data = request.all();
  
    empresas.merge(data);
    await empresas.save();

    return empresas
    }
    catch(err){
      return response.status(200).send(err)
    }
  }

  async destroy ({ params, response, request }) {
    const {empresa} = request.all(params)
  
    const del = await Empresa.findByOrFail('empresa', empresa)
    
    await del.delete()
     
    return response.status(200).send({ok:'Deletado com sucesso'})
  }
}


module.exports = EmpresaController
