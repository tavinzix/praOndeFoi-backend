import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'mensagens'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('conversa_id').unsigned().notNullable()
            table.integer('remetente_id').unsigned().notNullable()
            table.text('conteudo').notNullable()
            table.string('tipo').notNullable().defaultTo('texto')
            table.boolean('lida').notNullable().defaultTo(false)
            table.timestamp('data_criacao', { useTz: true }).notNullable()
            table.timestamp('deleted_at', { useTz: true }).nullable()

            table.foreign('conversa_id').references('id').inTable('conversas').onDelete('CASCADE')
            table.foreign('remetente_id').references('id').inTable('usuarios').onDelete('CASCADE')

            table.index(['conversa_id', 'data_criacao'])
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}