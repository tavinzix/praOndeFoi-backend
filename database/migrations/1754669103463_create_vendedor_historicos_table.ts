import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'vendedor_historicos'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('vendedor_id').unsigned().notNullable()
            table.integer('codAdm').unsigned().notNullable().comment('Administrador responsável pela alteração')
            table.enu('status', ['1', '2', '3', '4']).comment('1 = Aprovado, 2 = Rejeitado, 3 = Banido, 4 = Inativo')
            table.text('motivo_rejeicao').nullable().comment('Motivo da rejeição, se aplicável')
            table.timestamp('data_modificacao', { useTz: true }).defaultTo(this.now())
            
            table.foreign('vendedor_id').references('id').inTable('vendedores').onDelete('RESTRICT')
            table.foreign('codAdm').references('id').inTable('administradores').onDelete('RESTRICT')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}