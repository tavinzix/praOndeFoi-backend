import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'formas_pagamento'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.integer('user_id').unsigned().notNullable()
            table.string('nome_cartao', 30).notNullable()
            table.string('nome_titular', 255).notNullable()
            table.string('stripe_payment_method_id').nullable()
            table.string('bandeira').nullable()
            table.string('ultimos_4', 4).nullable()
            table.integer('mes_expiracao').unsigned().nullable()
            table.integer('ano_expiracao').unsigned().nullable()
            table.boolean('principal').defaultTo(false)
            table.boolean('ativo').defaultTo(true)

            table.foreign('user_id').references('id').inTable('usuarios').onDelete('CASCADE')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}