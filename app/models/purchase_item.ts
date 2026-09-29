import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import NormalizedProduct from '#models/normalized_product'
import Purchase from '#models/purchase'

export default class PurchaseItem extends BaseModel {
    static table = 'purchase_items'

    @column({ isPrimary: true })
    declare purchaseItemId: number

    @column()
    declare purchaseId: number

    @column()
    declare normalizedProductId: number | null

    @column()
    declare originalDescription: string

    @column()
    declare ncm: string | null

    @column()
    declare quantity: string

    @column()
    declare unit: string

    @column()
    declare unitPrice: string

    @column()
    declare totalPrice: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @belongsTo(() => Purchase, { foreignKey: 'purchaseId' })
    declare purchase: BelongsTo<typeof Purchase>

    @belongsTo(() => NormalizedProduct, { foreignKey: 'normalizedProductId' })
    declare normalizedProduct: BelongsTo<typeof NormalizedProduct>
}