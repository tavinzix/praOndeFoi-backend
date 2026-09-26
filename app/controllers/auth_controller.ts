import type { HttpContext } from '@adonisjs/core/http'
import Usuarios from '#models/usuarios'
import { DateTime } from 'luxon';
import CodigoRecuperacao from '#models/codigo_recuperacao';
import { geraCodigoRecuperacao } from '#helpers/gerarCodigo';
import EnvioEmail from '#helpers/envioEmail'
import usuarioService from '#services/UsuarioService'
import { AppException } from '#exceptions/AppExceptions';
import { alterarSenhaLogadoValidator, enviarEmailValidator, loginValidator, solicitarCodigoRecuperacao, verificarEmailValidator } from '#validators/AuthValidator'

export default class AuthController {
    public async login({ request, response }: HttpContext) {
        const { cpf, senha } = await request.validateUsing(loginValidator)

        await usuarioService.permitirLogin(cpf)

        let user;
        try {
            user = await Usuarios.verifyCredentials(cpf, senha)
        } catch (e) {
            if (e instanceof AppException) throw e
            return response.unauthorized({ message: 'Usuário ou senha inválidos' })
        }

        const token = await Usuarios.accessTokens.create(user, ['*'], {
            expiresIn: '7 days'
        })

        // Valida o tipo de usuário
        const tipoUsuario = await usuarioService.validarTipoUsuario(user.id)

        return response.json({
            user: {
                id: user.id,
                cpf: user.cpf,
                nomeCompleto: user.nomeCompleto,
                email: user.email,
                imgUser: user.img_user,
                tipoUsuario: tipoUsuario
            },
            token: {
                type: 'Bearer',
                value: token.value!.release()
            }
        })
    }

    public async logout({ auth, response }: HttpContext) {
        try {

            await usuarioService.revogarToken(auth)
            return response.json({
                message: 'Logout realizado com sucesso',
                revoked: true
            })
        } catch (e) {
            if (e instanceof AppException) throw e
            return response.unauthorized({ message: 'Token inválido ou expirado' })
        }
    }

    public async solicitarCodigoRecuperacao({ request, response }: HttpContext) {
        const { cpf, dt_nasc } = await request.validateUsing(solicitarCodigoRecuperacao)

        const usuario = await usuarioService.verificarDadosUsuario(cpf, dt_nasc)

        try {
            const expiresAt = DateTime.now().plus({ minutes: 30 });

            const codigo = await CodigoRecuperacao.create({
                userId: usuario.id,
                codigo: geraCodigoRecuperacao(),
                expires_at: expiresAt
            });

            await EnvioEmail.enviarCodigoRecuperacao(usuario, codigo.codigo)

            return response.created({ message: 'Código enviado por email' })

        } catch (e) {
            if (e instanceof AppException) throw e
            console.error('Erro ao enviar código de recuperação:', e)
            return response.badRequest({ message: 'Erro ao enviar código de recuperação' })
        }
    }

    public async verificarCodigoRecuperacao({ request, response }: HttpContext) {
        const { cpf, codigo } = await request.validateUsing(verificarEmailValidator)

        try {
            const usuario = await usuarioService.usuarioExiste(cpf);
            await usuarioService.verificarCodigo(usuario.id, codigo);

            return response.ok({
                message: 'Código verificado com sucesso',
                userId: usuario.id
            });
        } catch (e) {
            if (e instanceof AppException) throw e
            return response.badRequest({ message: 'Problema ao verificar código' })
        }
    }

    public async alterarSenha({ request, response, params }: HttpContext) {
        const userId = Number(params.id);
        const senha = request.input('senha');

        try {
            await usuarioService.alterarSenha(userId, senha)
            return response.ok({ message: 'Cadastro atualizado' })
        } catch (e) {
            if (e instanceof AppException) throw e
            console.error('Erro ao atualizar cadastro:', e)
            return response.internalServerError({ message: 'Erro ao atualizar cadastro' })
        }
    }

    public async alterarSenhaLogado({ auth, request, response }: HttpContext) {
        const usuario = await usuarioService.obterAutenticado(auth)
        const { senhaAtual, senhaNova } = await request.validateUsing(alterarSenhaLogadoValidator)

        try {
            await Usuarios.verifyCredentials(usuario.cpf, senhaAtual)
        } catch {
            return response.unauthorized({ message: 'Senha atual incorreta' })
        }

        await usuarioService.alterarSenha(usuario.id, senhaNova)
        return response.ok({ message: 'Senha alterada com sucesso' })
    }

    public async enviarEmailVerificacao({ request, response }: HttpContext) {
        const { cpf } = await request.validateUsing(enviarEmailValidator)

        try {
            const usuario = await usuarioService.usuarioExiste(cpf)

            if (usuario.email_verificado) return response.badRequest({ message: 'Este email já foi verificado. Você pode fazer login normalmente.' })

            await EnvioEmail.enviarCodigoVerificacao(usuario)

            return response.created({
                message: 'Código de verificação enviado por email',
                email: usuario.email
            })
        } catch (e) {
            if (e instanceof AppException) throw e
            console.error('Erro ao enviar código de verificação:', e)
            return response.internalServerError({ message: 'Erro ao enviar código de verificação' })
        }
    }

    public async verificarEmail({ request, response }: HttpContext) {
        const { cpf, codigo } = await request.validateUsing(verificarEmailValidator)

        try {
            await usuarioService.verificarEmail(cpf, codigo)
            return response.ok({ message: 'Email verificado com sucesso' })

        } catch (e) {
            if (e instanceof AppException) throw e
            console.error('Erro ao verificar código de verificação de email:', e)
            return response.internalServerError({ message: 'Erro ao verificar código' })
        }
    }
}