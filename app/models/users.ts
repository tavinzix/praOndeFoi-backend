import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import hash from '@adonisjs/core/services/hash'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
    uids: ['cpf'],
    passwordColumnName: 'password',
})

export default class Users extends compose(BaseModel, AuthFinder) {
    public static table = 'users'

    @column({ isPrimary: true })
    declare userId: number

    @column()
    declare name: string

    @column()
    declare email: string

    @column({ serializeAs: null })
    declare password: string

    @column.dateTime({ autoCreate: true })
    declare created_at: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updated_at: DateTime | null

    @beforeSave()
    public static async hashUserPassword(usuario: Users) {
        if (usuario.$dirty.password) {
            const isHashed = usuario.password.startsWith('$scrypt$')
            if (!isHashed) {
                usuario.password = await hash.make(usuario.password)
            }
        }
    }

    static accessTokens = DbAccessTokensProvider.forModel(Users)
}