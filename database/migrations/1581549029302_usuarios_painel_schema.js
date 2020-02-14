'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuariosPainelSchema extends Schema {
  up () {
    this.create('usuarios_painels', (table) => {      
      table.integer('idPainel').notNullable()
      table.integer('idUsuario').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('usuarios_painels')
  }
}

module.exports = UsuariosPainelSchema
