'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificacaoSchema extends Schema {
  up () {
    this.create('notificacaos', (table) => {
      table.increments()
      table.string('userEnvia').notNullable()
      table.string('userRecebe')           
      table.string('observacao')
      table.string('departamento')
      table.string('lido')       
      table.string('Empresa').notNullable()     
      table.timestamps()
    })
  }

  down () {
    this.drop('notificacaos')
  }
}

module.exports = NotificacaoSchema
