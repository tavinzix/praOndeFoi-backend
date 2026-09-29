import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import NormalizedProduct from '#models/normalized_product'

export default class Category extends BaseModel {
  static table = 'categories'

  @column({ isPrimary: true })
  declare categoryId: number

  @column()
  declare parentCategoryId: number | null

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Category, { foreignKey: 'parentCategoryId' })
  declare parentCategory: BelongsTo<typeof Category>

  @hasMany(() => Category, { foreignKey: 'parentCategoryId' })
  declare subcategories: HasMany<typeof Category>

  @hasMany(() => NormalizedProduct, { foreignKey: 'categoryId' })
  declare normalizedProducts: HasMany<typeof NormalizedProduct>
}
