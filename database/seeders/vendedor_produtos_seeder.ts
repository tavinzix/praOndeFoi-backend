import { BaseSeeder } from '@adonisjs/lucid/seeders'
import VendedorProduto from '#models/vendedores_produto'

export default class VendedorProdutoSeeder extends BaseSeeder {
    public async run() {
        await VendedorProduto.createMany([
            {
                vendedorId: 1,
                produtoId: 1,
                preco: 49.90,
                estoque: 20,
                status: true
            },
            {
                vendedorId: 1,
                produtoId: 2,
                preco: 199.90,
                estoque: 10,
                status: true
            },
            {
                vendedorId: 2,
                produtoId: 3,
                preco: 35.00,
                estoque: 50,
                status: true
            },
            {
                vendedorId: 2,
                produtoId: 4,
                preco: 120.00,
                estoque: 15,
                status: true
            },
            {
                vendedorId: 3,
                produtoId: 5,
                preco: 25.00,
                estoque: 30,
                status: true
            },
            {
                vendedorId: 3,
                produtoId: 6,
                preco: 60.00,
                estoque: 12,
                status: true
            },
            {
                vendedorId: 4,
                produtoId: 7,
                preco: 10.00,
                estoque: 100,
                status: true
            },
            {
                vendedorId: 4,
                produtoId: 8,
                preco: 15.00,
                estoque: 40,
                status: true
            },
            {
                vendedorId: 5,
                produtoId: 9,
                preco: 25.50,
                estoque: 25,
                status: true
            },
            {
                vendedorId: 1,
                produtoId: 10,
                preco: 75.00,
                estoque: 5,
                status: true
            },
            {
                vendedorId: 1,
                produtoId: 11,
                preco: 95.00,
                estoque: 18,
                status: true
            },
            {
                vendedorId: 1,
                produtoId: 12,
                preco: 28.00,
                estoque: 12,
                status: true
            },
            {
                vendedorId: 1,
                produtoId: 13,
                preco: 77.96,
                estoque: 5,
                status: true
            },
            {
                vendedorId: 1,
                produtoId: 14,
                preco: 5.00,
                estoque: 75,
                status: true
            },
            {
                vendedorId: 1,
                produtoId: 15,
                preco: 15.00,
                estoque: 96,
                status: true
            },
            {
                vendedorId: 1,
                produtoId: 16,
                preco: 75.00,
                estoque: 5,
                status: true
            },
            {
                vendedorId: 1,
                produtoId: 17,
                preco: 78.00,
                estoque: 509,
                status: true
            },
            {
                vendedorId: 1,
                produtoId: 18,
                preco: 75.00,
                estoque: 15,
                status: true
            },
            {
                vendedorId: 1,
                produtoId: 19,
                preco: 5.00,
                estoque: 52,
                status: true
            },
            {
                vendedorId: 1,
                produtoId: 20,
                preco: 14.00,
                estoque: 35,
                status: true
            },
        ])
    }
}
