import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vendedores_produtos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
        table.increments('id').primary()
        table.integer('vendedor_id').unsigned().notNullable()
        table.integer('produto_id').unsigned().notNullable()
        table.decimal('preco', 10, 2).notNullable()
        table.integer('estoque').notNullable().defaultTo(0)
        table.boolean('status').defaultTo(1)
        table.timestamp('data_criacao', { useTz: true }).defaultTo(this.now())

        table.foreign('vendedor_id').references('id').inTable('vendedores').onDelete('RESTRICT')
        table.foreign('produto_id').references('id').inTable('produtos').onDelete('RESTRICT')

        table.unique(['vendedor_id', 'produto_id'])

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}