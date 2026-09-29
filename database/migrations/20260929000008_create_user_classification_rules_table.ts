import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_classification_rules'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('user_classification_rule_id').primary()
      table.integer('user_id').unsigned().notNullable().references('user_id').inTable('users').onDelete('CASCADE')
      table.integer('normalized_product_id').unsigned().notNullable().references('normalized_product_id').inTable('normalized_products').onDelete('CASCADE')
      table.string('ncm_prefix', 8).nullable()
      table.string('description_pattern', 255).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.index(['user_id', 'ncm_prefix'])
      table.index(['user_id', 'description_pattern'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
