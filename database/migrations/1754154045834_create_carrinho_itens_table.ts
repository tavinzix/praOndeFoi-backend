import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'carrinho_itens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
        table.increments('id').primary()
        table.integer('carrinho_id').unsigned().notNullable()
        table.integer('produto_id').unsigned().notNullable()
        table.integer('quantidade').unsigned().notNullable().defaultTo(1)
        table.decimal('preco_unitario', 10,2).notNullable()

        table.foreign('carrinho_id').references('id').inTable('carrinhos').onDelete('CASCADE')
        table.foreign('produto_id').references('id').inTable('produtos').onDelete('CASCADE')
        table.timestamp('data_modificacao', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}