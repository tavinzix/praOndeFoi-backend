import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('category_id').primary()
      table.integer('parent_category_id').unsigned().nullable().references('category_id').inTable('categories').onDelete('SET NULL')
      table.string('name').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.unique(['parent_category_id', 'name'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
