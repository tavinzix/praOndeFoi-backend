import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'vendedor_aprovados'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.integer('vendedor_id').unsigned().notNullable()
            
            table.foreign('vendedor_id').references('id').inTable('vendedores')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}