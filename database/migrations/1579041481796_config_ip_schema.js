'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConfigIpSchema extends Schema {
  up () {
    this.create('config_ips', (table) => {
      table.increments()
      table.string('local').notNullable()
      table.string('ip').notNullable()  
      table.timestamps()
    })
  }

  down () {
    this.drop('config_ips')
  }
}

module.exports = ConfigIpSchema
