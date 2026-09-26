import { Authenticator } from '@adonisjs/auth'
import Usuarios from '#models/usuarios';
import { BusinessException, UnauthorizedException } from '#exceptions/AppExceptions'
import Administradores from '#models/administradores';
import Vendedores from '#models/vendedores';
import VendedorAprovado from '#models/vendedor_aprovado';
import CodigoRecuperacao from '#models/codigo_recuperacao';
import { DateTime } from 'luxon';
import { validarId } from '#helpers/validarId';
import VerificacaoEmail from '#models/verificacao_email';
import db from '@adonisjs/lucid/services/db';
import ImagemUploadService from '#helpers/imagemUpload'
import type { MultipartFile } from '@adonisjs/core/types/bodyparser'
import { atualizarImagemEntidade } from '#helpers/atualizarImagemEntidade';
import stripeCustomerService from './stripe/StripeCustomerService.js';

interface CriarUsuarioDTO {
    nome_completo: string
    email: string
    cpf: string
    senha: string
    telefone: string
    dt_nasc: Date
}

interface EditarUsuarioDTO {
    nome_completo?: string
    email?: string
    senha?: string
    telefone?: string
    foto?: MultipartFile | null
}

type UsuarioTipo = 'administrador' | 'vendedor' | 'comum'

export class UsuarioService {
    private static readonly USUARIO_ADMINISTRADOR = 'administrador'
    private static readonly USUARIO_VENDEDOR = 'vendedor'
    private static readonly USUARIO_COMUM = 'comum'
    private static readonly IMAGEM_PADRAO_USUARIO = 'https://res.cloudinary.com/dapcd8spu/image/upload/v1780873165/avatar.jpg'
    private static readonly STATUS_ATIVO = '1'
    // private static readonly STATUS_INATIVO = '2'
    // private static readonly STATUS_BANIDO = '3'

    async obterAutenticado(auth: Authenticator<any>): Promise<Usuarios> {
        const usuario = auth.user as Usuarios | undefined
        if (!usuario) throw new UnauthorizedException()
        return usuario
    }

    async buscarUsuarioPorCpf(cpf: string): Promise<Usuarios | null> {
        const cpfNormalizado = String(cpf ?? '').replace(/\D/g, '')
        if (cpfNormalizado.length !== 11) return null
        const usuario = await Usuarios.query().where('cpf', cpfNormalizado).where('status', '1').select(['id', 'nome_completo', 'cpf']).first()
        return usuario
    }

    async criarOuReativar(dados: CriarUsuarioDTO): Promise<{ usuario: Usuarios; reativado: boolean }> {
        const { nome_completo, email, cpf, senha, telefone, dt_nasc } = dados

        const usuarioInativo = await Usuarios.query().where('cpf', cpf).andWhere('status', '<>', UsuarioService.STATUS_ATIVO).first()

        if (usuarioInativo) {
            usuarioInativo.merge({
                nomeCompleto: nome_completo,
                email: email,
                senha: senha,
                telefone: telefone,
                dt_nasc: dt_nasc,
                status: UsuarioService.STATUS_ATIVO,
            })
            await usuarioInativo.save()
            await stripeCustomerService.obterOuCriarCustomerId(usuarioInativo)
            return { usuario: usuarioInativo, reativado: true }
        }

        const cpfEmUso = await Usuarios.query().where('cpf', cpf).andWhere('status', UsuarioService.STATUS_ATIVO).first()
        if (cpfEmUso) throw new BusinessException('Usuário já cadastrado com este CPF')

        const emailEmUso = await Usuarios.query().where('email', email).andWhere('status', UsuarioService.STATUS_ATIVO).first()
        if (emailEmUso) throw new BusinessException('Usuário já cadastrado com este email')

        const usuario = await Usuarios.create({
            nomeCompleto: nome_completo,
            email: email,
            cpf: cpf,
            senha: senha,
            telefone: telefone,
            dt_nasc: dt_nasc,
        })

        await stripeCustomerService.obterOuCriarCustomerId(usuario)

        return { usuario, reativado: false }
    }

    async editarPerfil(usuarioId: number, dados: EditarUsuarioDTO): Promise<Usuarios> {
        const usuario = await this.obterUsuarioPorId(usuarioId)
        const { nome_completo, email, senha, telefone, foto } = dados

        usuario.merge({
            nomeCompleto: nome_completo,
            email: email,
            senha: senha,
            telefone: telefone,
        })

        if (foto) {
            const imagem = await atualizarImagemEntidade(foto, usuario.img_user, 'usuarios', usuario.id)
            usuario.img_user = imagem
        }

        await usuario.save()
        return usuario
    }

    async removerFoto(usuarioId: number): Promise<void> {
        const usuario = await this.obterUsuarioPorId(usuarioId)

        if (usuario.img_user !== UsuarioService.IMAGEM_PADRAO_USUARIO) {
            try {
                await ImagemUploadService.delete(`usuarios/${usuario.id}`)
            } catch (e) {
                console.error('Erro ao deletar imagem do usuário no Cloudinary:', e)
            }
        }

        usuario.merge({ img_user: UsuarioService.IMAGEM_PADRAO_USUARIO })
        await usuario.save()
    }

    async removerConta(usuarioId: number): Promise<void> {
        const usuario = await this.obterUsuarioPorId(usuarioId)
        usuario.merge({ status: '2' })
        await usuario.save()
    }

    async listarTodos(): Promise<Usuarios[]> {
        return Usuarios.query().orderBy('nomeCompleto', 'asc')
    }

    async validarTipoUsuario(userId: number): Promise<UsuarioTipo> {
        try {
            // verifica se é administrador
            const adminExists = await Administradores.query().where('user_id', userId).where('status', '1').first()
            if (adminExists) return UsuarioService.USUARIO_ADMINISTRADOR

            // verifica se é vendedor
            const vendedor = await Vendedores.query().where('user_id', userId).first()
            if (vendedor) {
                const vendedorAprovado = await VendedorAprovado.query().where('vendedor_id', vendedor.id).first()
                if (vendedorAprovado) return UsuarioService.USUARIO_VENDEDOR
            }

            // se não for admin nem vendedor, é usuário comum
            return UsuarioService.USUARIO_COMUM
        } catch (error) {
            console.error('Erro ao validar tipo de usuário:', error)
            return UsuarioService.USUARIO_COMUM
        }
    }

    async permitirLogin(cpf: string): Promise<void> {
        const userExists = await Usuarios.findBy('cpf', cpf)
        if (!userExists) throw new UnauthorizedException('Usuário não cadastrado')
        if (userExists.status !== '1') throw new UnauthorizedException('Conta inativa')
        if (!userExists.email_verificado) throw new UnauthorizedException('Email não verificado. Verifique seu email para continuar')
    }

    async verificarDadosUsuario(cpf: string, dt_nasc: string): Promise<Usuarios> {
        const usuario = await Usuarios.query().where('cpf', cpf).andWhere('dt_nasc', dt_nasc).first()
        if (!usuario) throw new UnauthorizedException('Usuário não encontrado para os dados digitados')

        return usuario
    }

    async usuarioExiste(cpf: string): Promise<Usuarios> {
        const usuario = await Usuarios.findBy('cpf', cpf)
        if (!usuario) throw new UnauthorizedException('Usuário não cadastrado')
        return usuario
    }

    async verificarCodigo(userId: number, codigo: string): Promise<void> {
        const codigoValido = await CodigoRecuperacao.query().where('user_id', userId).andWhere('codigo', codigo).orderBy('created_at', 'desc').first()
        if (!codigoValido || DateTime.now() > codigoValido.expires_at) throw new UnauthorizedException('Código inválido ou expirado')
    }

    async obterUsuarioPorId(id: number): Promise<Usuarios> {
        validarId(id, 'do usuário')
        const usuario = await Usuarios.find(id)
        if (!usuario) throw new UnauthorizedException('Usuário não encontrado')
        return usuario
    }

    async alterarSenha(userId: number, senha: string): Promise<void> {
        const usuario = await this.obterUsuarioPorId(userId)
        usuario.merge({ senha: senha })
        await usuario.save()
    }

    async verificarEmail(cpf: string, codigo: string): Promise<void> {
        const usuario = await this.usuarioExiste(cpf)
        const verificacaoEmail = await VerificacaoEmail.query().where('user_id', usuario.id).where('codigo', codigo).orderBy('created_at', 'desc').first()
        if (!verificacaoEmail) throw new UnauthorizedException('Código inválido')

        if (DateTime.now() > verificacaoEmail.expiresAt) throw new UnauthorizedException('Código expirado')

        const trx = await db.transaction()

        try {
            verificacaoEmail.merge({ verifiedAt: DateTime.now() })
            await verificacaoEmail.useTransaction(trx).save()

            usuario.merge({ email_verificado: true })
            await usuario.useTransaction(trx).save()

            await trx.commit()
        } catch (error) {
            await trx.rollback()
            throw error
        }
    }

    async revogarToken(auth: Authenticator<any>): Promise<void> {
        await auth.authenticate()
        const user = auth.getUserOrFail()
        const token = auth.user!.currentAccessToken
        await Usuarios.accessTokens.delete(user, token.identifier)
    }
}

export default new UsuarioService()