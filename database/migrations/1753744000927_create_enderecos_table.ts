import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
        table.increments('id').primary()
        table.integer('user_id').unsigned().notNullable()
        table.enu('tipo', ['Casa', 'Trabalho']).defaultTo('Casa')
        table.string('cep', 9).notNullable()
        table.string('estado', 2).notNullable()
        table.string('cidade', 100).notNullable()
        table.string('bairro', 100).notNullable()
        table.string('rua').notNullable()
        table.string('numero', 20).notNullable()
        table.string('complemento').nullable()
        table.boolean('ativo').defaultTo(1)

        table.foreign('user_id').references('id').inTable('usuarios').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}