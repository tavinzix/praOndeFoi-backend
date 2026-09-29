import { DateTime } from 'luxon'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Purchase from '#models/purchase'

export default class PurchasesSeeder extends BaseSeeder {
    async run() {
        await Purchase.create({
            userId: 1,
            gfId: 1,
            establishmentId: 1,
            accessKey: null,
            issuedAt: DateTime.now(),
            totalAmount: '70.00',
            origin: 'MANUAL',
        })
    }
}