import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'avaliacoes_pedidos_imagens'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.integer('avaliacao_id').unsigned().notNullable()
            table.string('imagem_url').notNullable()
            table.integer('ordem').defaultTo(1)
            table.timestamp('created_at').defaultTo(this.now())

            table.foreign('avaliacao_id').references('id').inTable('avaliacoes_pedidos').onDelete('CASCADE')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
