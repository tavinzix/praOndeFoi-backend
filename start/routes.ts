import Route from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import AuthController from '#controllers/auth_controller'
import UsuariosController from '#controllers/usuarios_controller'
import VendedoresController from '#controllers/vendedores_controller'
import AdministradorController from '#controllers/administrador_controller'
import ProdutosController from '#controllers/produtos_controller'
import CarrinhosController from '#controllers/carrinhos_controller'
import PedidosController from '#controllers/pedidos_controller'
import WebhooksController from '#controllers/webHooks_controller'
import ChatController from '#controllers/chat_controller'
import MetodosFreteController from '#controllers/metodos_frete_controller'

Route.get('/', async () => {
    return { hello: 'world' }
})

//login e logout
Route.group(() => {
    Route.post('/login', [AuthController, 'login'])
    Route.post('/logout', [AuthController, 'logout'])
    Route.post('/recuperarsenha/', [AuthController, 'solicitarCodigoRecuperacao'])
    Route.post('/verificarcodigo/', [AuthController, 'verificarCodigoRecuperacao'])
    Route.post('/enviarCodigoVerificacao/', [AuthController, 'enviarEmailVerificacao'])
    Route.post('/verificarCodigoEmail/', [AuthController, 'verificarEmail'])
    Route.patch('/alterarsenha/:id', [AuthController, 'alterarSenha'])
    Route.patch('/usuario/update/senha', [AuthController, 'alterarSenhaLogado']).use(middleware.auth())
})

//usuarios
Route.group(() => {
    Route.post('/usuario/create', [UsuariosController, 'criarUsuario'])
    Route.patch('/usuario/update/cadastro', [UsuariosController, 'editarUsuario']).use(middleware.auth())
    Route.patch('/usuario/update/removerfoto', [UsuariosController, 'removerFoto']).use(middleware.auth())
    Route.patch('/usuario/delete/conta', [UsuariosController, 'removerConta']).use(middleware.auth())
    Route.get('/usuario/info/usuario', [UsuariosController, 'usuarioInfo']).use(middleware.auth())
    Route.get('/administrador/info/usuarioPorCpf', [UsuariosController, 'buscarUsuarioPorCpf']).use(middleware.auth())
})

//endereços
Route.group(() => {
    Route.post('/usuario/create/endereco', [UsuariosController, 'criarEnderecoUsuario'])
    Route.patch('/usuario/update/endereco/:enderecoId', [UsuariosController, 'editarEnderecoUsuario'])
    Route.patch('/usuario/delete/endereco/:enderecoId', [UsuariosController, 'removerEnderecoUsuario'])
    Route.get('/usuario/info/endereco', [UsuariosController, 'enderecosInfo'])
}).use(middleware.auth())

//formas de pagamento
Route.group(() => {
    Route.post('/usuario/create/formaPagamento', [UsuariosController, 'criarFormaPagamentoUsuario'])
    Route.patch('/usuario/update/formaPagamento/:fpId', [UsuariosController, 'editarFormaPagamentoUsuario'])
    Route.patch('/usuario/delete/formaPagamento/:formaId', [UsuariosController, 'removerFormaPagamento'])
    Route.get('/usuario/info/formaPagamento', [UsuariosController, 'formasPagamentoInfo'])
}).use(middleware.auth())

//vendedor
Route.group(() => {
    Route.post('/vendedor/create/solicitacaoVendedor', [VendedoresController, 'criarSolicitacao'])
    Route.patch('/vendedor/update/perfilLoja', [VendedoresController, 'editarPerfil'])
    Route.patch('/vendedor/update/removerfoto', [VendedoresController, 'removerFoto'])
    Route.get('/vendedor/info/byIdUsuario', [VendedoresController, 'vendedorInfobyIdusuario'])
    Route.get('/vendedor/info/historicoVendedor/', [VendedoresController, 'historicoVendedor'])
    Route.get('/vendedor/info/resumoPedidosVendas', [VendedoresController, 'resumoPedidosVendas'])
    Route.get('/vendedor/info/pedidosPendentesCount', [VendedoresController, 'pedidosPendentesCount'])
    Route.get('/vendedor/vendasPeriodo', [VendedoresController, 'vendasPeriodo'])
    Route.get('/vendedor/vendasPorItens', [VendedoresController, 'vendasPorItens'])
    Route.post('/vendedor/stripe/onboarding-link', [VendedoresController, 'gerarLinkOnboardingStripe'])

    //financeiro
    Route.group(() => {
        Route.get('/vendedor/financeiro/resumo', [VendedoresController, 'financeiroResumo'])
        Route.get('/vendedor/financeiro/historico', [VendedoresController, 'financeiroHistorico'])
        Route.get('/vendedor/financeiro/payouts', [VendedoresController, 'financeiroPayouts'])
    })

    //pedidos
    Route.group(() => {
        Route.get('/vendedor/info/detalhesPedidos', [VendedoresController, 'detalhesPedidos'])
        Route.get('/vendedor/info/pedidoEspecifico/:pedidoId', [VendedoresController, 'pedidoEspecifico'])
        Route.get('/vendedor/info/detalhesPedidosRecentes', [VendedoresController, 'detalhesPedidosRecentes'])
        Route.patch('/vendedor/update/statusPedido/:itemId', [VendedoresController, 'atualizarStatusPedidoItem'])
    })

    //produto
    Route.group(() => {
        Route.post('/vendedor/create/produto', [ProdutosController, 'criarProduto'])
        Route.patch('/vendedor/update/inativarProduto/:produtoId', [ProdutosController, 'inativarProduto'])
        Route.patch('/vendedor/update/ativarProduto/:produtoId', [ProdutosController, 'ativarProduto'])
        Route.post('/vendedor/update/editarProduto/:produtoId', [ProdutosController, 'editarProduto'])
        Route.get('/vendedor/info/produtoVendedor/', [ProdutosController, 'produtoVendedorInfo'])
        Route.get('/vendedor/info/produtoVendedorbyparam', [ProdutosController, 'produtoVendedorByParamInfo'])
        Route.post('/produto/info/estoque', [ProdutosController, 'produtoEstoqueInfo'])
        Route.post('/vendedor/create/promocao/:vendedorProdutoId', [ProdutosController, 'criarPromocao'])
        Route.patch('/vendedor/update/promocao/:vendedorProdutoId', [ProdutosController, 'editarPromocao'])
        Route.delete('/vendedor/produtos/:vendedorProdutoId/promocao', [ProdutosController, 'cancelarPromocao'])
    })

    //frete
    Route.group(() => {
        Route.post('/vendedor/frete/metodos', [MetodosFreteController, 'criarMetodo'])
        Route.patch('/vendedor/frete/metodos/:metodoFreteId', [MetodosFreteController, 'editarMetodo'])
        Route.delete('/vendedor/frete/metodos/:metodoFreteId', [MetodosFreteController, 'inativarMetodo'])
        Route.get('/vendedor/frete/metodos', [MetodosFreteController, 'listarMetodos'])
        Route.post('/vendedor/frete/metodos/:metodoFreteId/faixas', [MetodosFreteController, 'adicionarFaixa'])
        Route.patch('/vendedor/frete/faixas/:faixaId', [MetodosFreteController, 'editarFaixa'])
        Route.delete('/vendedor/frete/faixas/:faixaId', [MetodosFreteController, 'removerFaixa'])
    })
}).use(middleware.auth())

//administrador
Route.group(() => {
    Route.post('/administrador/aprovar/vendedor/:solicId', [AdministradorController, 'aprovarSolicitacao'])
    Route.post('/administrador/rejeitar/vendedor/:solicId', [AdministradorController, 'rejeitarSolicitacao'])
    Route.post('/administrador/create/categoria/', [AdministradorController, 'criarCategoria'])
    Route.patch('/administrador/update/categoria/:categoriaId', [AdministradorController, 'editarCategoria'])
    Route.patch('/administrador/ativar/categoria/:categoriaId', [AdministradorController, 'ativarCategoria'])
    Route.patch('/administrador/inativar/categoria/:categoriaId', [AdministradorController, 'inativarCategoria'])
    Route.get('/administrador/info/categoria/', [AdministradorController, 'categoriaInfo'])
    Route.get('/administrador/info/allSolicVend/', [AdministradorController, 'allSolicVendInfo'])
    Route.get('/administrador/info/solicVendbystatus/:status', [AdministradorController, 'solicVendInfobyStatus'])
    Route.get('/administrador/info/solicDetalhe/:solicId', [AdministradorController, 'solicitacaoDetalhe'])
    Route.get('/administrador/info/allUsuarios/', [AdministradorController, 'allUsuarios'])
    Route.post('/administrador/create/administrador', [AdministradorController, 'criarAdministrador'])
    Route.delete('/administrador/delete/administrador', [AdministradorController, 'removerAdministrador'])
    Route.get('/administrador/info/allProdutos/', [AdministradorController, 'allProdutos'])
    Route.get('/administrador/info/pedidos/', [AdministradorController, 'pedidosInfo'])
    Route.get('/administrador/info/vendasPeriodo/', [AdministradorController, 'vendasPeriodo'])
    Route.get('/administrador/info/topVendedores/', [AdministradorController, 'topVendedores'])
    Route.post('/administrador/create/banner/', [AdministradorController, 'criarBanner'])
    Route.patch('/administrador/update/banner/:bannerId', [AdministradorController, 'editarBanner'])
    Route.get('/administrador/info/banner/', [AdministradorController, 'bannerInfo'])
    Route.get('/administrador/info/contadoresMenu', [AdministradorController, 'contadoresMenu'])

    //comentários de produtos
    Route.get('/administrador/info/avaliacao', [AdministradorController, 'listarAvaliacoesPedidos'])
    Route.post('/administrador/aprovar/avaliacao/:avaliacaoId', [AdministradorController, 'aprovarAvaliacaoPedido'])
    Route.post('/administrador/rejeitar/avaliacao/:avaliacaoId', [AdministradorController, 'rejeitarAvaliacaoPedido'])
    Route.patch('/administrador/deletar/avaliacao/:avaliacaoId', [AdministradorController, 'deletarAvaliacaoPedido'])


    Route.get('/administrador/info/configuracaoPlataforma', [AdministradorController, 'configuracaoPlataforma'])
    Route.patch('/administrador/update/configuracaoPlataforma', [AdministradorController, 'atualizarUsuarioSuporte'])
    Route.patch('/administrador/update/taxaPlataforma', [AdministradorController, 'atualizarTaxaPlataforma'])
    Route.get('/administrador/info/configuracao-suporte', [AdministradorController, 'obterConfiguracaoSuporte'])
}).use(middleware.auth())

//carrinho
Route.group(() => {
    Route.post('/carrinho/create/adicionarItem/', [CarrinhosController, 'adicionarProduto'])
    Route.delete('/carrinho/delete/removerItem/:itemId', [CarrinhosController, 'removerProduto'])
    Route.patch('/carrinho/update/editarQuantidade/:itemId', [CarrinhosController, 'editarQuantidade'])
    Route.get('/carrinho/info/allItensCarrinho', [CarrinhosController, 'allInfoItensCarrinho'])
    Route.get('/carrinho/frete/opcoes', [CarrinhosController, 'opcoesCheckout'])
}).use(middleware.auth())

//pedido
Route.group(() => {
    Route.post('/pedido/create/finalizarCompleto', [PedidosController, 'finalizarPedidoCompleto'])
    Route.get('/pedido/info/meusPedidos', [PedidosController, 'meusPedidos'])
    Route.get('/pedido/info/detalhes/:id', [PedidosController, 'detalhesPedido'])

    Route.post('/pedido/create/avaliacaoPedido/:pedidoItemId', [PedidosController, 'criarAvaliacaoPedido'])
    Route.patch('/pedido/update/avaliacaoPedido/:avaliacaoId', [PedidosController, 'editarAvaliacaoPedido'])
    Route.get('/pedido/info/avaliacaoPedido/:pedidoItemId', [PedidosController, 'buscarAvaliacaoItem'])
}).use(middleware.auth())

//chat
Route.group(() => {
    Route.post('/conversas/abrir', [ChatController, 'abrirConversa'])
    Route.get('/conversas', [ChatController, 'listarConversa'])
    Route.post('/mensagens', [ChatController, 'enviarMensagem'])
    Route.get('/conversas/:conversaId/mensagens', [ChatController, 'listarHistoricoMensagens'])
    Route.patch('/conversas/:conversaId/marcar-lidas', [ChatController, 'marcarMensagensComoLidas'])
}).use(middleware.auth())

Route.get('/administrador/info/categoriaAtiva/', [AdministradorController, 'categoriaAtivaInfo'])
Route.get('/administrador/info/bannerAtivo/', [AdministradorController, 'bannerAtivoInfo'])
Route.get('/administrador/info/categoriabyUrl', [AdministradorController, 'categoriaByParamInfo'])
Route.get('/vendedor/info/produtoAtivo', [ProdutosController, 'produtoAtivoInfo'])
Route.get('/vendedor/info/produtoAtivoVendedor/:vendedorId', [ProdutosController, 'produtoAtivoVendedorInfo'])
Route.get('/vendedor/info/produtoSlug/:slug', [ProdutosController, 'produtoSlug'])
Route.post('/produto/info/frete/:produtoId', [ProdutosController, 'calcularFreteProduto'])
Route.get('/vendedor/info/produtoCategoria/:slug', [ProdutosController, 'produtoCategoriaInfo'])
Route.get('/vendedor/info/vendedorSlug/:slug', [VendedoresController, 'vendedorInfobyNomeLoja'])
Route.post('/vendedor/info/produtoByAtributo/', [ProdutosController, 'produtoByAtributo'])
Route.get('/produtos/busca', [ProdutosController, 'buscarProdutos'])
Route.get('/produto/info/avaliacoes/:produtoId', [PedidosController, 'buscarComentariosAprovados'])
Route.post('/webhooks/stripe', [WebhooksController, 'stripe'])
Route.get('/ofertas', [ProdutosController, 'listarOfertas'])
Route.get('/produtos/catalogo', [ProdutosController, 'listarCatalogo'])
Route.get('/configuracaoPlataforma/taxa', [AdministradorController, 'obterTaxaPlataforma'])