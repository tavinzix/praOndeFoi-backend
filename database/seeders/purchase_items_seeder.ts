import { BaseSeeder } from '@adonisjs/lucid/seeders'
import PurchaseItem from '#models/purchase_item'

export default class PurchaseItemsSeeder extends BaseSeeder {
    async run() {
        await PurchaseItem.create({
            purchaseId: 1,
            normalizedProductId: 1,
            originalDescription: 'Arroz 5KG',
            ncm: null,
            quantity: '2.000',
            unit: 'UN',
            unitPrice: '25.00',
            totalPrice: '50.00',
        })
    }
}