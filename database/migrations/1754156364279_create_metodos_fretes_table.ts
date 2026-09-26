import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'metodos_frete'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.integer('vendedor_id').unsigned().notNullable()
            table.string('tipo', 50).notNullable()
            table.boolean('ativo').notNullable().defaultTo(1)
            table.timestamp('data_criacao', { useTz: true }).defaultTo(this.now())

            table.foreign('vendedor_id').references('id').inTable('vendedores').onDelete('CASCADE')
            table.unique(['vendedor_id', 'tipo'])
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}