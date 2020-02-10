'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PainelSchema extends Schema {
  up () {
    this.create('painels', (table) => {
      table.increments()
      table.integer('idEmpresa')
      table.string('descricaoEmpresa')
      table.string('Descricao')
      table.string('Link')
      table.string('Setor')    
      table.timestamps()
    })
  }

  down () {
    this.drop('painels')
  }
}

module.exports = PainelSchema
