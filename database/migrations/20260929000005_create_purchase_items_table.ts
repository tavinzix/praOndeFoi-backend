import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'purchase_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('purchase_item_id').primary()
      table.integer('purchase_id').unsigned().notNullable().references('purchase_id').inTable('purchases').onDelete('CASCADE')
      table.integer('normalized_product_id').unsigned().nullable().references('normalized_product_id').inTable('normalized_products').onDelete('SET NULL')
      table.text('original_description').notNullable()
      table.string('ncm', 8).nullable()
      table.decimal('quantity', 18, 6).notNullable()
      table.string('unit', 16).notNullable()
      table.decimal('unit_price', 18, 10).notNullable()
      table.decimal('total_price', 12, 2).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
