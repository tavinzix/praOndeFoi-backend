import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'carrinhos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
        table.increments('id').primary()
        table.integer('usuario_id').unsigned().notNullable()
        table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}