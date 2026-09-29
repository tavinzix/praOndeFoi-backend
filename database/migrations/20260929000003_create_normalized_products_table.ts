import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'normalized_products'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('normalized_product_id').primary()
            table.string('name').notNullable().unique()
            table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
            table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}