'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SetorSchema extends Schema {
  up () {
    this.create('setors', (table) => {
      table.increments()
      table.integer('idEmpresa').notNullable()
      table.string('descricaoEmpresa')
      table.string('descricao')
      table.timestamps()
    })
  }


  down () {
    this.drop('setors')
  }
}

module.exports = SetorSchema
