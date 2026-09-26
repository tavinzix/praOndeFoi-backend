import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'produto_imagens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
        table.increments('id').primary()
        table.integer('produto_id').unsigned().notNullable()
        table.string('imagem_url').notNullable()
        table.integer('ordem').defaultTo(1)

        table.foreign('produto_id').references('id').inTable('produtos').onDelete('RESTRICT')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}