import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const loginValidator = vine.compile(
    vine.object({
        email: vine.string().trim().minLength(1),
        password: vine.string().trim().minLength(1),
    })
)
loginValidator.messagesProvider = new SimpleMessagesProvider({
    required: 'Campo obrigatório',
})

export const updatePasswordValidator = vine.compile(
    vine.object({
        senhaAtual: vine.string().trim(),
        senhaNova: vine.string().trim().minLength(8).confirmed(),
        senhaNova_confirmation: vine.string().trim().minLength(8),
    })
)
updatePasswordValidator.messagesProvider = new SimpleMessagesProvider({
    required: 'Campo obrigatório',
    minLength: 'Campo deve ter pelo menos 8 caracteres',
    confirmed: 'As senhas não conferem',
})