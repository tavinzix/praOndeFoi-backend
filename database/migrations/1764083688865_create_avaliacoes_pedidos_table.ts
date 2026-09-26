import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'avaliacoes_pedidos'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('usuario_id').unsigned().notNullable()
            table.integer('pedidoitem_id').unsigned().notNullable().unique()
            table.integer('produto_id').unsigned().notNullable()
            table.integer('vendedor_id').unsigned().notNullable()
            table.integer('avaliacao_produto').notNullable().checkBetween([1, 5])
            table.string('comentario', 300)
            table.integer('avaliacao_vendedor').notNullable().checkBetween([1, 5])
            table.string('status').defaultTo('0').notNullable() //0=pendente, 1=aprovado, 2=rejeitado
            table.text('motivo_rejeicao').nullable()
            table.timestamp('created_at')
            table.timestamp('updated_at')

            table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE')
            table.foreign('pedidoitem_id').references('id').inTable('pedidos_itens').onDelete('CASCADE')
            table.foreign('produto_id').references('id').inTable('produtos')
            table.foreign('vendedor_id').references('id').inTable('vendedores').onDelete('CASCADE')

            table.unique(['usuario_id', 'pedidoitem_id'])
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}