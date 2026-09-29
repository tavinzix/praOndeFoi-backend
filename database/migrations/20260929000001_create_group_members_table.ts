import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'group_members'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('group_member_id').primary()
            table.integer('gf_id').unsigned().notNullable().references('gf_id').inTable('family_groups').onDelete('CASCADE')
            table.integer('user_id').unsigned().notNullable().references('user_id').inTable('users').onDelete('CASCADE')
            table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
            table.unique(['gf_id', 'user_id'])
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}