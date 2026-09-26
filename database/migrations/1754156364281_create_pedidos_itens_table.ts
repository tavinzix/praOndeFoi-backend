import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'pedidos_itens'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.integer('pedido_id').unsigned().notNullable()
            table.integer('produto_id').unsigned().notNullable()
            table.decimal('quantidade', 10, 2).notNullable().defaultTo(1)
            table.decimal('preco_unitario', 10, 2).notNullable()
            table.enu('status', ['1', '2', '3', '4', '5', '6']).defaultTo('1')
                .comment('1 = aguardando envio, 2 = a caminho, 3 = enviado, 4 = entregue, 5 = cancelado, 6 = devolvido')
            table.string('codigo_rastreamento').nullable()
            table.string('transportadora').nullable()
            table.dateTime('data_entrega').nullable()
            table.integer('promocao_id').unsigned().nullable()
            table.integer('metodo_frete_id').unsigned().nullable()
            table.decimal('valor_frete', 10, 2).notNullable().defaultTo(0)
            table.integer('prazo_entrega_dias').unsigned().nullable()

            table.foreign('pedido_id').references('id').inTable('pedidos').onDelete('CASCADE')
            table.foreign('produto_id').references('id').inTable('produtos')
            table.foreign('promocao_id').references('id').inTable('promocoes').onDelete('SET NULL')
            table.foreign('metodo_frete_id').references('id').inTable('metodos_frete').onDelete('SET NULL')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}