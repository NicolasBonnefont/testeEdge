'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class File extends Model {
  static get computed(){
    return ['url']

  }

  getUrl({ id }){
    return `http://mor-api-com.umbler.net/files/${id}`

  }

}

module.exports = File
