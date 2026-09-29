import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createUserValidator = vine.compile(
    vine.object({
        name: vine.string().trim().minLength(1),
        email: vine.string().trim().email(),
        password: vine.string().trim().minLength(8),
    })
)
createUserValidator.messagesProvider = new SimpleMessagesProvider({
    required: 'Campo obrigatório',
    email: 'Email inválido',
    minLength: 'Campo muito curto',
})

export const updateUserValidator = vine.compile(
    vine.object({
        name: vine.string().trim().minLength(1).optional(),
        email: vine.string().trim().email().optional(),
        password: vine.string().trim().minLength(8).optional(),
    })
)
updateUserValidator.messagesProvider = new SimpleMessagesProvider({
    email: 'Email inválido',
    minLength: 'Campo muito curto',
})