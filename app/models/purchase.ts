import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Establishment from '#models/establishment'
import FamilyGroup from '#models/family_group'
import PurchaseItem from '#models/purchase_item'
import Users from '#models/users'

export default class Purchase extends BaseModel {
    static table = 'purchases'

    @column({ isPrimary: true })
    declare purchaseId: number

    @column()
    declare userId: number

    @column()
    declare gfId: number | null

    @column()
    declare establishmentId: number | null

    @column()
    declare accessKey: string | null

    @column.dateTime()
    declare issuedAt: DateTime

    @column()
    declare totalAmount: string

    @column()
    declare origin: 'NFC_E' | 'MANUAL'

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @belongsTo(() => Users, { foreignKey: 'userId' })
    declare user: BelongsTo<typeof Users>

    @belongsTo(() => FamilyGroup, { foreignKey: 'gfId' })
    declare familyGroup: BelongsTo<typeof FamilyGroup>

    @belongsTo(() => Establishment, { foreignKey: 'establishmentId' })
    declare establishment: BelongsTo<typeof Establishment>

    @hasMany(() => PurchaseItem, { foreignKey: 'purchaseId' })
    declare items: HasMany<typeof PurchaseItem>
}