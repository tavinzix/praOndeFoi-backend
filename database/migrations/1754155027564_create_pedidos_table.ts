import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pedidos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
        table.increments('id').primary()
        table.integer('usuario_id').unsigned().notNullable()
        table.integer('endereco_entrega_id').unsigned().notNullable()
        table.integer('forma_pagamento_id').unsigned().notNullable()
        table.timestamp('data_pedido', { useTz: true }).defaultTo(this.now())
        table.decimal('valor_total', 10,2).notNullable()
        table.enu('status_pagamento', ['1', '2', '3', '4', '5']).defaultTo('1')
            .comment('1 = aguardando pagamento, 2 = pago, 3 = falhou, 4 = reembolsado, 5 = estornado')
        table.string('stripe_payment_intent_id').nullable()
        
        table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE')
        table.foreign('endereco_entrega_id').references('id').inTable('enderecos').onDelete('CASCADE')
        table.foreign('forma_pagamento_id').references('id').inTable('formas_pagamento').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}