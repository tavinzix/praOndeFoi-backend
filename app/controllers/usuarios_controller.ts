import type { HttpContext } from '@adonisjs/core/http'
import usuarioService from '#services/UsuarioService'
import enderecoService from '#services/EnderecoService'
import formaPagamentoService from '#services/FormaPagamentoService'
import adminService from '#services/AdminService'
import EnvioEmail from '#helpers/envioEmail'
import { AppException } from '#exceptions/AppExceptions'
import { criarUsuarioValidator, editarUsuarioValidator } from '#validators/UsuarioValidator'
import { criarEnderecoValidator, editarEnderecoValidator } from '#validators/EnderecoValidator'
import { criarFormaPagamentoValidator, editarFormaPagamentoValidator } from '#validators/FormaPagamentoValidator'

export default class UsuariosController {
    //------------FUNÇÕES CREATE---------
    public async criarUsuario({ request, response }: HttpContext) {
        const { nome_completo, email, cpf, senha, telefone, dt_nasc } = await request.validateUsing(criarUsuarioValidator)

        try {
            const { usuario, reativado } = await usuarioService.criarOuReativar({ nome_completo, email, cpf, senha, telefone, dt_nasc })
            await EnvioEmail.enviarCodigoVerificacao(usuario)

            return response.created({
                message: reativado
                    ? 'Conta reativada com sucesso. Verifique seu email.'
                    : 'Usuário criado com sucesso. Verifique seu email para confirmar a conta.',
                email: usuario.email,
                cpf: usuario.cpf,
            })
        } catch (e) {
            if (e instanceof AppException) throw e
            console.error('Erro ao criar usuário:', e)
            return response.internalServerError({ message: 'Erro ao criar usuário' })
        }
    }

    public async criarEnderecoUsuario({ auth, request, response }: HttpContext) {
        const usuario = await usuarioService.obterAutenticado(auth)
        const { tipo, cep, estado, cidade, bairro, rua, numero, complemento } = await request.validateUsing(criarEnderecoValidator)

        try {
            await enderecoService.criar(usuario.id, { tipo, cep, estado, cidade, bairro, rua, numero, complemento })
            return response.created({ message: 'Endereço criado com sucesso' })
        } catch (e) {
            if (e instanceof AppException) throw e
            console.error('Erro ao criar endereço:', e)
            return response.internalServerError({ message: 'Problema ao criar endereço' })
        }
    }

    public async criarFormaPagamentoUsuario({ auth, request, response }: HttpContext) {
        const usuario = await usuarioService.obterAutenticado(auth)
        const { nomeCartao, paymentMethodId } = await request.validateUsing(criarFormaPagamentoValidator)

        try {
            await formaPagamentoService.criar(usuario.id, { nomeCartao, paymentMethodId })
            return response.created({ message: 'Forma de pagamento criada com sucesso' })
        } catch (e) {
            if (e instanceof AppException) throw e
            console.error('Erro ao criar forma de pagamento:', e)
            return response.internalServerError({ message: 'Problema ao criar forma de pagamento' })
        }
    }
    //------------FIM DAS FUNÇÕES CREATE-----------

    //-----------FUNÇÕES UPDATE------------------
    public async editarUsuario({ auth, request, response }: HttpContext) {
        const usuario = await usuarioService.obterAutenticado(auth)
        const { nome_completo, email, senha, telefone } = await request.validateUsing(editarUsuarioValidator)
        const foto = request.file('foto')

        try {
            const usuarioAtualizado = await usuarioService.editarPerfil(usuario.id, { nome_completo, email, senha, telefone, foto })
            return response.ok({ message: 'Cadastro atualizado', imgUser: usuarioAtualizado.img_user })
        } catch (e) {
            if (e instanceof AppException) throw e
            console.error('Erro ao editar usuário:', e)
            return response.internalServerError({ message: 'Erro ao atualizar cadastro' })
        }
    }

    public async editarEnderecoUsuario({ auth, request, response, params }: HttpContext) {
        const usuario = await usuarioService.obterAutenticado(auth)
        const enderecoId = Number(params.enderecoId)
        const { tipo, cep, estado, cidade, bairro, rua, numero, complemento } = await request.validateUsing(editarEnderecoValidator)

        try {
            await enderecoService.editar(enderecoId, usuario.id, { tipo, cep, estado, cidade, bairro, rua, numero, complemento })
            return response.ok({ message: 'Endereço atualizado com sucesso' })
        } catch (e) {
            if (e instanceof AppException) throw e
            console.error('Erro ao editar endereço:', e)
            return response.internalServerError({ message: 'Problema ao atualizar endereço' })
        }
    }

    public async editarFormaPagamentoUsuario({ auth, request, response, params }: HttpContext) {
        const usuario = await usuarioService.obterAutenticado(auth)
        const fpId = Number(params.fpId)
        const { nomeCartao, paymentMethodId } = await request.validateUsing(editarFormaPagamentoValidator)

        try {
            await formaPagamentoService.editar(fpId, usuario.id, { nomeCartao, paymentMethodId })
            return response.ok({ message: 'Forma de pagamento atualizada com sucesso' })
        } catch (e) {
            if (e instanceof AppException) throw e
            console.error('Erro ao editar forma de pagamento:', e)
            return response.internalServerError({ message: 'Problema ao atualizar forma de pagamento' })
        }
    }

    public async removerEnderecoUsuario({ auth, response, params }: HttpContext) {
        const usuario = await usuarioService.obterAutenticado(auth)
        const enderecoId = Number(params.enderecoId)

        await enderecoService.remover(enderecoId, usuario.id)
        return response.ok({ message: 'Endereço removido com sucesso' })
    }

    public async removerFormaPagamento({ auth, response, params }: HttpContext) {
        const usuario = await usuarioService.obterAutenticado(auth)
        const fpId = Number(params.formaId)

        await formaPagamentoService.remover(fpId, usuario.id)
        return response.ok({ message: 'Forma de pagamento removida com sucesso' })
    }

    public async removerFoto({ auth, response }: HttpContext) {
        const usuario = await usuarioService.obterAutenticado(auth)

        try {
            await usuarioService.removerFoto(usuario.id)
            return response.ok({ message: 'Foto removida com sucesso' })
        } catch (e) {
            if (e instanceof AppException) throw e
            console.error('Erro ao remover foto do usuário:', e)
            return response.internalServerError({ message: 'Erro ao remover foto' })
        }
    }

    public async removerConta({ auth, response }: HttpContext) {
        const usuario = await usuarioService.obterAutenticado(auth)

        try {
            await usuarioService.removerConta(usuario.id)
            return response.ok({ message: 'Conta removida com sucesso' })
        } catch (e) {
            if (e instanceof AppException) throw e
            console.error('Erro ao remover conta:', e)
            return response.internalServerError({ message: 'Erro ao remover conta' })
        }
    }
    //------------FIM DAS FUNÇÕES UPDATE-----------

    //-----------FUNÇÕES PARA BUSCAR INFORMAÇÕES------------------
    public async usuarioInfo({ auth, response }: HttpContext) {
        const usuario = await usuarioService.obterAutenticado(auth)
        return response.ok(usuario.serialize())
    }

    public async buscarUsuarioPorCpf({ auth, request, response }: HttpContext) {
        const usuario = await usuarioService.obterAutenticado(auth)
        await adminService.obterAdministrador(usuario.id)

        const usuarioEncontrado = await usuarioService.buscarUsuarioPorCpf(request.input('cpf'))
        if (!usuarioEncontrado) return response.notFound({ message: 'Usuário não encontrado para o CPF informado' })

        const administrador = await adminService.obterAdministradorOuNulo(usuarioEncontrado.id)
        return response.ok({
            usuario: {
                id: usuarioEncontrado.id,
                nome: usuarioEncontrado.nomeCompleto,
                cpf: usuarioEncontrado.cpf,
                administradorAtivo: Boolean(administrador),
            },
        })
    }

    public async enderecosInfo({ auth, response }: HttpContext) {
        const usuario = await usuarioService.obterAutenticado(auth)
        const endereco = await enderecoService.listarAtivos(usuario.id)
        return response.ok({ userCpf: usuario.cpf, endereco })
    }

    public async formasPagamentoInfo({ auth, response }: HttpContext) {
        const usuario = await usuarioService.obterAutenticado(auth)
        const fp = await formaPagamentoService.listarAtivas(usuario.id)
        return response.ok({ userCpf: usuario.cpf, fp })
    }
    //------------FIM DAS FUNÇÕES DE BUSCAR INFORMAÇÕES-----------
}