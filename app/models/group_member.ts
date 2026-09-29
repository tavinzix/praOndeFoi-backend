import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import FamilyGroup from '#models/family_group'
import Users from '#models/users'

export default class GroupMember extends BaseModel {
    static table = 'group_members'

    @column({ isPrimary: true })
    declare groupMemberId: number

    @column()
    declare gfId: number

    @column()
    declare userId: number

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @belongsTo(() => FamilyGroup, { foreignKey: 'gfId' })
    declare familyGroup: BelongsTo<typeof FamilyGroup>

    @belongsTo(() => Users, { foreignKey: 'userId' })
    declare user: BelongsTo<typeof Users>
}