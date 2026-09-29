import { Authenticator } from '@adonisjs/auth'
import Users from '#models/users';
import { BusinessException, UnauthorizedException } from '#exceptions/AppExceptions'
import { validarId } from '#helpers/validarId';

interface CreateUserDTO {
    name: string
    email: string
    password: string
}

interface UpdateUserDTO {
    name?: string
    email?: string
    password?: string
}

export class UserService {
    private async getUserById(id: number): Promise<Users> {
        validarId(id, 'do usuário')
        const usuario = await Users.find(id)
        if (!usuario) throw new UnauthorizedException('Usuário não encontrado')
        return usuario
    }

    async getAuthenticated(auth: Authenticator<any>): Promise<Users> {
        const user = auth.user as Users | undefined
        if (!user) throw new UnauthorizedException()
        return user
    }


    async createUser(data: CreateUserDTO): Promise< Users > {
        const { name, email, password } = data

        const emailInUse = await Users.query().where('email', email).first()
        if (emailInUse) throw new BusinessException('Usuário já cadastrado com este email')

        const user = await Users.create({ name, email, password })
        return user 
    }

    async updateUser(userId: number, data: UpdateUserDTO): Promise<Users> {
        const user = await this.getUserById(userId)
        const { name, email, password } = data

        user.merge({ name, email, password })
        await user.save()
        return user
    }

    async listAll(): Promise<Users[]> {
        return Users.query().orderBy('name', 'asc')
    }

    async updatePassword(userId: number, password: string): Promise<void> {
        const user = await this.getUserById(userId)
        user.merge({ password })
        await user.save()
    }

    async revogarToken(auth: Authenticator<any>): Promise<void> {
        await auth.authenticate()
        const user = auth.getUserOrFail()
        const token = auth.user!.currentAccessToken
        await Users.accessTokens.delete(user, token.identifier)
    }
}

export default new UserService()