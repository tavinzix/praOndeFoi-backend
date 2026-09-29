import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Establishment from '#models/establishment'

export default class EstablishmentsSeeder extends BaseSeeder {
    async run() {
        await Establishment.create(
            {
                cnpjRoot: '12345678',
                name: 'Mercado Exemplo'
            },
        )
    }
}