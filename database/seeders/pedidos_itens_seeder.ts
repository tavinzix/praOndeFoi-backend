import { BaseSeeder } from '@adonisjs/lucid/seeders'
import PedidoItem from '#models/pedidos_itens'

export default class PedidoItemSeeder extends BaseSeeder {
    public async run() {
        await PedidoItem.createMany([
            {
                pedidoId: 1,
                produtoId: 1,
                quantidade: 2,
                precoUnitario: 29.90,
                status: '1', // aguardando pagamento
            },
            {
                pedidoId: 2,
                produtoId: 3,
                quantidade: 1,
                precoUnitario: 120.00,
                status: '2', // a caminho
            },
            {
                pedidoId: 3,
                produtoId: 4,
                quantidade: 1,
                precoUnitario: 35.50,
                status: '3', // aguardando envio
            },
            {
                pedidoId: 4,
                produtoId: 2,
                quantidade: 2,
                precoUnitario: 125.00,
                status: '4', // enviado
            },
            {
                pedidoId: 5,
                produtoId: 6,
                quantidade: 1,
                precoUnitario: 79.99,
                status: '5', // entregues
            },
            {
                pedidoId: 6,
                produtoId: 7,
                quantidade: 1,
                precoUnitario: 19.90,
                status: '6', // cancelados
            },
            {
                pedidoId: 7,
                produtoId: 8,
                quantidade: 1,
                precoUnitario: 145.75,
                status: '2', // reembolsado
            },
            {
                pedidoId: 8,
                produtoId: 9,
                quantidade: 1,
                precoUnitario: 98.45,
                status: '1', // estornado
            },
            {
                pedidoId: 9,
                produtoId: 10,
                quantidade: 1,
                precoUnitario: 30.00,
                status: '1', // devolvido
            },
            {
                pedidoId: 10,
                produtoId: 5,
                quantidade: 2,
                precoUnitario: 105.30,
                status: '5', // entregues
            },

            {
                pedidoId: 11,
                produtoId: 10,
                quantidade: 1,
                precoUnitario: 50.00,
                status: '1',
            },
            {
                pedidoId: 11,
                produtoId: 11,
                quantidade: 2,
                precoUnitario: 25.00,
                status: '2',
            },
            {
                pedidoId: 12,
                produtoId: 12,
                quantidade: 1,
                precoUnitario: 100.00,
                status: '3',
            },
            {
                pedidoId: 12,
                produtoId: 13,
                quantidade: 1,
                precoUnitario: 100.00,
                status: '4',
            },
            {
                pedidoId: 13,
                produtoId: 14,
                quantidade: 3,
                precoUnitario: 50.00,
                status: '5',
            },
            {
                pedidoId: 13,
                produtoId: 15,
                quantidade: 1,
                precoUnitario: 0.00,
                status: '6',
            },
            {
                pedidoId: 14,
                produtoId: 16,
                quantidade: 2,
                precoUnitario: 150.00,
                status: '1',
            },
            {
                pedidoId: 14,
                produtoId: 17,
                quantidade: 1,
                precoUnitario: 150.00,
                status: '1',
            },
            {
                pedidoId: 12,
                produtoId: 18,
                quantidade: 1,
                precoUnitario: 250.00,
                status: '1',
            },
            {
                pedidoId: 11,
                produtoId: 19,
                quantidade: 1,
                precoUnitario: 0.00,
                status: '1',
            },
            {
                pedidoId: 11,
                produtoId: 20,
                quantidade: 2,
                precoUnitario: 125.00,
                status: '2',
            }
        ])
    }
}
