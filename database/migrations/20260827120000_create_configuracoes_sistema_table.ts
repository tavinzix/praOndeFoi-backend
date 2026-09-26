import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'configuracoes_sistema'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.integer('usuario_suporte').unsigned().nullable()
            table.decimal('taxa_plataforma', 5, 2).notNullable().defaultTo(10)

            table.foreign('usuario_suporte').references('id').inTable('usuarios').onDelete('SET NULL')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}