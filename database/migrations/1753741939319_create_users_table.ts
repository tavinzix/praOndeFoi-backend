import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
        table.increments('user_id').primary()
        table.string('name').nullable()
        table.string('email').notNullable().unique()
        table.string('password').notNullable()
        table.timestamp('created_at').notNullable()
        table.timestamp('updated_at', { useTz: true }).defaultTo(this.now()).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}