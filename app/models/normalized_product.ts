import { DateTime } from 'luxon'
import { BaseModel, beforeSave, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Category from '#models/category'
import PurchaseItem from '#models/purchase_item'

export default class NormalizedProduct extends BaseModel {
    static table = 'normalized_products'

    @column({ isPrimary: true })
    declare normalizedProductId: number

    @column()
    declare name: string

    @column()
    declare categoryId: number | null

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @hasMany(() => PurchaseItem, { foreignKey: 'normalizedProductId' })
    declare purchaseItems: HasMany<typeof PurchaseItem>

    @belongsTo(() => Category, { foreignKey: 'categoryId' })
    declare category: BelongsTo<typeof Category>

    @beforeSave()
    static validateCategory(product: NormalizedProduct) {
        if (product.categoryId === null || product.categoryId === undefined) {
            throw new Error('A normalized product must belong to a category')
        }
    }
}
