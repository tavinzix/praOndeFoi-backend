import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'conversas'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('participante_um_id').unsigned().notNullable()
            table.integer('participante_dois_id').unsigned().notNullable()
            table.timestamp('data_criacao', { useTz: true }).notNullable()

            table.foreign('participante_um_id').references('id').inTable('usuarios').onDelete('CASCADE')
            table.foreign('participante_dois_id').references('id').inTable('usuarios').onDelete('CASCADE')
            table.unique(['participante_um_id', 'participante_dois_id'])
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}