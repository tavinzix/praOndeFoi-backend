import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'promocoes'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.integer('vendedor_produto_id').unsigned().notNullable()
            table.decimal('preco_promocional', 10, 2).notNullable()
            table.string('tipo', 50).notNullable()
            table.integer('estoque_promocional').unsigned().nullable()
            table.timestamp('data_inicio', { useTz: true }).notNullable()
            table.timestamp('data_fim', { useTz: true }).notNullable()
            table.boolean('ativa').notNullable().defaultTo(1)
            table.timestamp('data_criacao', { useTz: true }).defaultTo(this.now())

            table.foreign('vendedor_produto_id').references('id').inTable('vendedores_produtos').onDelete('CASCADE')

            table.index(['vendedor_produto_id', 'ativa'])
            table.index(['ativa', 'data_inicio', 'data_fim'])
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}