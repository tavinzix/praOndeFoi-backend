import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'purchases'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('purchase_id').primary()
            table.integer('user_id').unsigned().notNullable().references('user_id').inTable('users').onDelete('CASCADE')
            table.integer('gf_id').unsigned().nullable().references('gf_id').inTable('family_groups').onDelete('SET NULL')
            table.integer('establishment_id').unsigned().nullable().references('establishment_id').inTable('establishments').onDelete('SET NULL')
            table.string('access_key', 44).nullable().unique()
            table.timestamp('issued_at', { useTz: true }).notNullable()
            table.decimal('total_amount', 12, 2).notNullable()
            table.enum('origin', ['NFC_E', 'MANUAL']).notNullable()
            table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
            table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}