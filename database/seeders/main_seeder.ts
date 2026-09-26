// database/seeders/MainSeeder.ts
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class MainSeeder extends BaseSeeder {
    private async runSeeder(SeederClass: typeof BaseSeeder) {
        try {
            const seeder = new SeederClass(this.client)
            await seeder.run()
            console.log(`✅ ${SeederClass.name} executado com sucesso`)
        } catch (error) {
            console.error(`❌ Erro ao executar ${SeederClass.name}:`, error.message)
            throw error
        }
    }

    public async run() {
        console.log('🌱 Iniciando execução dos seeders...')

        try {
            const AdministradoresSeeder = (await import('./administradores_seeder.js')).default
            const UsuarioSeeder = (await import('./usuario_seeder.js')).default
            const CategoriaSeeder = (await import('./categoria_seeder.js')).default
            const VendedoreSeeder = (await import('./vendedore_seeder.js')).default
            const FormasPagamentoSeeder = (await import('./formas_pagamento_seeder.js')).default
            const CarrinhoItensSeeder = (await import('./carrinho_itens_seeder.js')).default
            const CarrinhoSeeder = (await import('./carrinho_seeder.js')).default
            const EnderecoSeeder = (await import('./endereco_seeder.js')).default
            const ProdutoImagemSeeder = (await import('./produto_imagem_seeder.js')).default
            const ProdutosSeeder = (await import('./produtos_seeder.js')).default
            const VendedorProdutosSeeder = (await import('./vendedor_produtos_seeder.js')).default
            const PedidosItensSeeder = (await import('./pedidos_itens_seeder.js')).default
            const PedidosSeeder = (await import('./pedidos_seeder.js')).default
            const BannerHomeSeeder = (await import('./banner_home_seeder.js')).default
            const VendedorAprovado = (await import('./vendedor_aprovado.js')).default
            const ConfiguracoesSistemaSeeder = (await import('./configuracoes_sistema_seeder.js')).default

            // do menos dependente para o mais dependente
            await this.runSeeder(UsuarioSeeder)
            await this.runSeeder(EnderecoSeeder)
            await this.runSeeder(VendedoreSeeder)
            await this.runSeeder(AdministradoresSeeder)
            await this.runSeeder(ConfiguracoesSistemaSeeder)
            await this.runSeeder(CategoriaSeeder)
            await this.runSeeder(FormasPagamentoSeeder)
            await this.runSeeder(ProdutosSeeder)
            await this.runSeeder(VendedorProdutosSeeder)
            await this.runSeeder(ProdutoImagemSeeder)
            await this.runSeeder(CarrinhoSeeder)
            await this.runSeeder(CarrinhoItensSeeder)
            await this.runSeeder(PedidosSeeder)
            await this.runSeeder(PedidosItensSeeder)
            await this.runSeeder(BannerHomeSeeder)
            await this.runSeeder(VendedorAprovado)

            console.log('🎉 Todos os seeders foram executados com sucesso!')

        } catch (error) {
            console.error('💥 Erro durante a execução dos seeders:', error)
            throw error
        }
    }
}