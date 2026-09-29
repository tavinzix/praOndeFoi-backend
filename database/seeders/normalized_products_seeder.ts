import { BaseSeeder } from '@adonisjs/lucid/seeders'
import NormalizedProduct from '#models/normalized_product'

export default class NormalizedProductsSeeder extends BaseSeeder {
    async run() {
        await NormalizedProduct.createMany([
            {
                name: 'Arroz'
            },
            {
                name: ' Feijão'
            }
        ])
    }
}