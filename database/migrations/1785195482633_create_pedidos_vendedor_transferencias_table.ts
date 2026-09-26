import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'pedidos_vendedor_transferencias'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.integer('pedido_id').unsigned().notNullable()
            table.integer('vendedor_id').unsigned().notNullable()
            table.decimal('valor_bruto', 10, 2).notNullable()
            table.decimal('valor_frete', 10, 2).notNullable().defaultTo(0)
            table.decimal('valor_comissao', 10, 2).notNullable()
            table.decimal('valor_repassado', 10, 2).notNullable()
            table.string('stripe_transfer_id').nullable()
            table.enu('status', ['1', '2', '3']).defaultTo('1')
                .comment('1 = pendente, 2 = transferido, 3 = falhou')
            table.timestamp('data_criacao', { useTz: true }).defaultTo(this.now())

            table.foreign('pedido_id').references('id').inTable('pedidos').onDelete('CASCADE')
            table.foreign('vendedor_id').references('id').inTable('vendedores').onDelete('CASCADE')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}