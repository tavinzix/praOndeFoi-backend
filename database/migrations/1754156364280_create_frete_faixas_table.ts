import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'frete_faixas'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.integer('metodo_frete_id').unsigned().notNullable()
            table.string('estado', 2).notNullable()
            table.decimal('peso_min', 10, 2).notNullable().defaultTo(0)
            table.decimal('peso_max', 10, 2).nullable()
            table.decimal('valor', 10, 2).notNullable()
            table.integer('prazo_entrega_dias').unsigned().notNullable()

            table.foreign('metodo_frete_id').references('id').inTable('metodos_frete').onDelete('CASCADE')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}