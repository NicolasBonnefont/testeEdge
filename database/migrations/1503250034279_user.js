'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('name', 80).notNullable()      
      table.string('password', 60).notNullable()
      table.string('empresa', 80)
      table.string('token')
      table.boolean('admin').defaultTo('false')
      table.boolean('gestor').defaultTo('false')
      table.string('url')
      table.string('urlID')
      table.string('urlCapa')
      table.string('idCapa')
      table.timestamp('token_created_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
