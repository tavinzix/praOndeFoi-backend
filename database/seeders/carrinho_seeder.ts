import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Carrinho from '#models/carrinho'

export default class CarrinhoSeeder extends BaseSeeder {
    public async run() {
        await Carrinho.createMany([
            {
                usuarioId: 1
            },
            {
                usuarioId: 2
            },
            {
                usuarioId: 3
            },
            {
                usuarioId: 4
            },
            {
                usuarioId: 5
            },
            {
                usuarioId: 6
            },
            {
                usuarioId: 7
            },
            {
                usuarioId: 8
            },
            {
                usuarioId: 9
            },
            {
                usuarioId: 10 
            },
        ])
    }
}
