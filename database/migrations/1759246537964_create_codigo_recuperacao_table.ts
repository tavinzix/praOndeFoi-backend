import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'codigo_recuperacao'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('user_id').unsigned().notNullable()
            table.string('codigo').notNullable().unique()
            table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
            table.timestamp('expires_at')

            table.foreign('user_id').references('id').inTable('usuarios').onDelete('CASCADE')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}