import type { HttpContext } from '@adonisjs/core/http'
import Users from '#models/users'
import userService from '#services/UserService'
import { AppException } from '#exceptions/AppExceptions';
import { loginValidator, updatePasswordValidator } from '#validators/AuthValidator';

export default class AuthController {
    public async login({ request, response }: HttpContext) {
        const { email, password } = await request.validateUsing(loginValidator)

        let user;
        try {
            user = await Users.verifyCredentials(email, password)
        } catch (e) {
            if (e instanceof AppException) throw e
            return response.unauthorized({ message: 'Usuário ou senha inválidos' })
        }

        const token = await Users.accessTokens.create(user, ['*'], {
            expiresIn: '7 days'
        })

        return response.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token: {
                type: 'Bearer',
                value: token.value!.release()
            }
        })
    }

    public async logout({ auth, response }: HttpContext) {
        try {

            await userService.revogarToken(auth)
            return response.json({
                message: 'Logout realizado com sucesso',
                revoked: true
            })
        } catch (e) {
            if (e instanceof AppException) throw e
            return response.unauthorized({ message: 'Token inválido ou expirado' })
        }
    }

    public async updatePassword({ auth, request, response }: HttpContext) {
        const user = await userService.getAuthenticated(auth)
        const { senhaAtual, senhaNova } = await request.validateUsing(updatePasswordValidator)

        try {
            await Users.verifyCredentials(user.email, senhaAtual)
        } catch {
            return response.unauthorized({ message: 'Senha atual incorreta' })
        }

        await userService.updatePassword(user.userId, senhaNova)
        return response.ok({ message: 'Senha alterada com sucesso' })
    }
}