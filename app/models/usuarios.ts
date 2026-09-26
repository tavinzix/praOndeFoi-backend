import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import hash from '@adonisjs/core/services/hash'
import AvaliacoesPedidos from './avaliacoes_pedidos.js'
import VerificacaoEmail from './verificacao_email.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
    uids: ['cpf'],
    passwordColumnName: 'senha',
})

export default class Usuarios extends compose(BaseModel, AuthFinder) {
    public static table = 'usuarios'

    @column({ isPrimary: true })
    declare id: number

    @column()
    declare nomeCompleto: string

    @column()
    declare email: string

    @column()
    declare cpf: string

    @column({ serializeAs: null })
    declare senha: string

    @column()
    declare telefone: string

    @column()
    declare dt_nasc: Date

    @column.dateTime({ autoCreate: true })
    declare dataCriacao: DateTime

    @column()
    declare status: '1' | '2' | '3'

    @column({
        prepare: (value: boolean) => value ? 1 : 0,
        consume: (value: any) => Boolean(value),
    })
    declare email_verificado: boolean

    @column()
    declare stripeCustomerId: string | null

    @column()
    declare img_user: string

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare dataAtualizacao: DateTime | null

    @beforeSave()
    public static async hashSenha(usuario: Usuarios) {
        if (usuario.$dirty.senha) {
            const isHashed = usuario.senha.startsWith('$scrypt$')
            if (!isHashed) {
                usuario.senha = await hash.make(usuario.senha)
            }
        }
    }

    static accessTokens = DbAccessTokensProvider.forModel(Usuarios)

    @hasMany(() => AvaliacoesPedidos, {
        foreignKey: 'usuarioId',
    })

    declare comentarios: HasMany<typeof AvaliacoesPedidos>

    @hasMany(() => VerificacaoEmail, {
        foreignKey: 'userId',
        localKey: 'id',
    })
    declare emailVerifications: HasMany<typeof VerificacaoEmail>
}