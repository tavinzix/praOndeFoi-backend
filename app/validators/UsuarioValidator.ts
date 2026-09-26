import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const criarUsuarioValidator = vine.compile(
    vine.object({
        nome_completo: vine.string().trim().minLength(1),
        email: vine.string().trim().email(),
        cpf: vine.string().trim().minLength(11).maxLength(11),
        senha: vine.string().trim().minLength(8),
        telefone: vine.string().trim().minLength(10),
        dt_nasc: vine.date(),
    })
)
criarUsuarioValidator.messagesProvider = new SimpleMessagesProvider({
    required: 'Campo obrigatório',
    email: 'Email inválido',
    minLength: 'Campo muito curto',
})

export const editarUsuarioValidator = vine.compile(
    vine.object({
        nome_completo: vine.string().trim().minLength(1).optional(),
        email: vine.string().trim().email().optional(),
        senha: vine.string().trim().minLength(8).optional(),
        telefone: vine.string().trim().minLength(10).optional(),
    })
)
editarUsuarioValidator.messagesProvider = new SimpleMessagesProvider({
    email: 'Email inválido',
    minLength: 'Campo muito curto',
})