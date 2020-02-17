'use strict'
const File = use('App/Models/File')
const Helpers = use('Helpers')
const fs = require('fs')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FileController {

  async store({ request, response }) {
    try {

      if (!request.file('file')) return response.status(200).send({ mensagem: "erro" })

      const upload = request.file('file', { size: '10mb' })

      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.publicPath('uploads'), {
        name: fileName
      })

      if (!upload.moved()) {
        throw upload.error()
      }

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype

      })

      return file


    } catch (err) {

      return response.status(err.status).send({ erro: { message: "erro no upload" } })
    }

  }

  async show({ params, response }) {

    const file = await File.findOrFail(params.id)

    return response.download(Helpers.publicPath(`uploads/${file.file}`))


  }

  async destroy({ params, response }) {
    const file = await File.findByOrFail(params)
    await file.delete()

    try {
      fs.unlinkSync(Helpers.publicPath(`uploads/${file.file}`))
      return response.status(200).send({ ok: 'IMG Deletado com sucesso' })
    }
    catch (err) {
      return response.status(500).send({ Erro: 'Problema na exclusão da IMG', err })
    }

  }
}

module.exports = FileController
