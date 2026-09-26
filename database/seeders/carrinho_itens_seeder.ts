import { BaseSeeder } from '@adonisjs/lucid/seeders'
import CarrinhoItem from '#models/carrinho_itens'

export default class CarrinhoItemSeeder extends BaseSeeder {
    public async run() {
        await CarrinhoItem.createMany([
            {
                carrinhoId: 1,
                produtoId: 1,
                quantidade: 2,
                precoUnitario: 19.90
            },
            {
                carrinhoId: 1,
                produtoId: 5,
                quantidade: 1,
                precoUnitario: 34.50
            },
            {
                carrinhoId: 2,
                produtoId: 2,
                quantidade: 3,
                precoUnitario: 10.00
            },
            {
                carrinhoId: 3,
                produtoId: 3,
                quantidade: 1,
                precoUnitario: 99.99
            },
            {
                carrinhoId: 4,
                produtoId: 7,
                quantidade: 4,
                precoUnitario: 7.75
            }
            ,
            {
                carrinhoId: 5,
                produtoId: 10,
                quantidade: 2,
                precoUnitario: 29.90
            },
            {
                carrinhoId: 6,
                produtoId: 6,
                quantidade: 1,
                precoUnitario: 55.00
            },
            {
                carrinhoId: 7,
                produtoId: 4,
                quantidade: 3,
                precoUnitario: 8.30
            }
            ,
            {
                carrinhoId: 8,
                produtoId: 12,
                quantidade: 1,
                precoUnitario: 18.00
            },
            {
                carrinhoId: 9,
                produtoId: 8,
                quantidade: 2,
                precoUnitario: 44.44
            },
            {
                carrinhoId: 10,
                produtoId: 9,
                quantidade: 1,
                precoUnitario: 20.00
            },
        ])
    }
}
