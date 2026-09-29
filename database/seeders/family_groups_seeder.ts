import { BaseSeeder } from '@adonisjs/lucid/seeders'
import FamilyGroup from '#models/family_group'

export default class FamilyGroupsSeeder extends BaseSeeder {
    async run() {
        await FamilyGroup.create({ name: 'Casa da família Fagundes' })
    }
}