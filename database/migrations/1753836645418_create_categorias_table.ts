import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categorias'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
        table.increments('id').primary()
        table.string('nome').notNullable()
        table.text('descricao')
        table.string('imagem').notNullable()
        table.string('url').notNullable().unique()
        table.boolean('status').defaultTo(true)
        table.timestamp('data_criacao', { useTz: true }).defaultTo(this.now())
        table.timestamp('data_atualizacao', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}