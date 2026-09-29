import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import GroupMember from '#models/group_member'
import Purchase from '#models/purchase'

export default class FamilyGroup extends BaseModel {
    static table = 'family_groups'

    @column({ isPrimary: true })
    declare gfId: number

    @column()
    declare name: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @hasMany(() => GroupMember, { foreignKey: 'gfId' })
    declare members: HasMany<typeof GroupMember>

    @hasMany(() => Purchase, { foreignKey: 'gfId' })
    declare purchases: HasMany<typeof Purchase>
}