import { DateTime } from 'luxon'
import { BaseModel, beforeSave, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import NormalizedProduct from '#models/normalized_product'
import Users from '#models/users'

export default class UserClassificationRule extends BaseModel {
  static table = 'user_classification_rules'

  @column({ isPrimary: true })
  declare userClassificationRuleId: number

  @column()
  declare userId: number

  @column()
  declare normalizedProductId: number

  @column()
  declare ncmPrefix: string | null

  @column()
  declare descriptionPattern: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Users, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof Users>

  @belongsTo(() => NormalizedProduct, { foreignKey: 'normalizedProductId' })
  declare normalizedProduct: BelongsTo<typeof NormalizedProduct>

  @beforeSave()
  static normalizeSignals(rule: UserClassificationRule) {
    if (!rule.ncmPrefix?.trim() && !rule.descriptionPattern?.trim()) {
      throw new Error('A classification rule must contain an NCM prefix or a description pattern')
    }

    if (rule.ncmPrefix) {
      rule.ncmPrefix = rule.ncmPrefix.trim().toUpperCase()
    }

    if (rule.descriptionPattern) {
      rule.descriptionPattern = rule.descriptionPattern
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase()
        .replace(/[^A-Z0-9 ]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    }
  }
}
