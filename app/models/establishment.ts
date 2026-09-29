import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Purchase from '#models/purchase'

export default class Establishment extends BaseModel {
    static table = 'establishments'

    @column({ isPrimary: true })
    declare establishmentId: number

    @column()
    declare cnpjRoot: string

    @column()
    declare name: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @hasMany(() => Purchase, { foreignKey: 'establishmentId' })
    declare purchases: HasMany<typeof Purchase>

    @beforeSave()
    static normalizeCnpjRoot(establishment: Establishment) {
        const normalizedRoot = establishment.cnpjRoot.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()

        if (normalizedRoot.length !== 8) {
            throw new Error('CNPJ não tem 8 caracteres alfanuméricos no root')
        }

        establishment.cnpjRoot = normalizedRoot
    }
}