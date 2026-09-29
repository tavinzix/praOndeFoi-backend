import type { HttpContext } from '@adonisjs/core/http'
import userService from '#services/UserService'
import { AppException } from '#exceptions/AppExceptions'
import { createUserValidator, updateUserValidator } from '#validators/UsuarioValidator'

export default class UserController {
    public async createUser({ request, response }: HttpContext) {
        const { name, email, password } = await request.validateUsing(createUserValidator)

        try {
            const user = await userService.createUser({ name, email, password })

            return response.created({
                message: 'Usuário criado com sucesso.',
                email: user.email,
            })
        } catch (e) {
            if (e instanceof AppException) throw e
            console.error('Erro ao criar usuário:', e)
            return response.internalServerError({ message: 'Erro ao criar usuário' })
        }
    }

public async updateUser({ auth, request, response }: HttpContext) {
        const user = await userService.getAuthenticated(auth)
        const { name, email, password } = await request.validateUsing(updateUserValidator)

        try {
            await userService.updateUser(user.userId, { name, email, password })
            return response.ok({ message: 'Cadastro atualizado' })
        } catch (e) {
            if (e instanceof AppException) throw e
            console.error('Erro ao editar usuário:', e)
            return response.internalServerError({ message: 'Erro ao atualizar cadastro' })
        }
    }

    public async userInfo({ auth, response }: HttpContext) {
        const usuario = await userService.getAuthenticated(auth)
        return response.ok(usuario.serialize())
    }
}