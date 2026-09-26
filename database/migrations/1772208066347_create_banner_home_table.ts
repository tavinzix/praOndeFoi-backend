import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'banner_home'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('titulo', 255).notNullable()
            table.string('subtitulo', 255)
            table.string('imagem', 255).notNullable()
            table.string('link', 255).notNullable()
            table.integer('ordem').notNullable()
            table.string('cor_texto', 20).notNullable()
            table.string('cor_fundo', 20).notNullable()
            table.date('dt_inicio').notNullable()
            table.date('dt_fim').notNullable()

            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })

            table.check('dt_fim >= dt_inicio')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}