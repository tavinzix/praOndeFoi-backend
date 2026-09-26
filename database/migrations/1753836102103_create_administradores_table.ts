import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'administradores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
        table.increments('id').primary()
        table.integer('user_id').unsigned().notNullable().unique()
        table.timestamp('data_criacao', { useTz: true }).defaultTo(this.now())
        table.enu('status', ['1', '2']).defaultTo('1').comment('1 = ativo, 2 = inativo')
        
        table.foreign('user_id').references('id').inTable('usuarios').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}