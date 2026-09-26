import { BaseSeeder } from '@adonisjs/lucid/seeders'
import VendedorAprovado from '#models/vendedor_aprovado'

export default class VendedorAprovadoSeeder extends BaseSeeder {
    public async run() {
        await VendedorAprovado.createMany([
            {
                vendedorId: 1,
            },
            {
                vendedorId: 2,
            },
            {
                vendedorId: 3,
            },
            {
                vendedorId: 4,
            },
            {
                vendedorId: 5,
            },
            {
                vendedorId: 6,
            },
            {
                vendedorId: 7,
            },
            {
                vendedorId: 8,
            },
            {
                vendedorId: 9,
            },
            {
                vendedorId: 10,
            },
           
        ])
    }
}
