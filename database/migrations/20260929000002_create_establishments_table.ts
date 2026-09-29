import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'establishments'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('establishment_id').primary()
            table.string('cnpj_root', 8).notNullable().unique()
            table.string('name').notNullable()
            table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
            table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}