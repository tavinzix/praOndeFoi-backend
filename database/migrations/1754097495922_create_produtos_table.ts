import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'produtos'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()

            table.string('nome', 255).notNullable()
            table.text('descricao').notNullable()
            table.integer('categoria_id').unsigned().notNullable()
            table.string('marca', 255).notNullable()
            table.jsonb('atributos').notNullable()
            table.decimal('peso', 10, 2).notNullable()
            table.jsonb('dimensoes').nullable()
            table.string('slug', 255).notNullable().unique()
            table.timestamp('data_criacao', { useTz: true }).defaultTo(this.now())
            table.timestamp('data_atualizacao', { useTz: true }).defaultTo(this.now())

            table.foreign('categoria_id').references('id').inTable('categorias').onDelete('RESTRICT')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}