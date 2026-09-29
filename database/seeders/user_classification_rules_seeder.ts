import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserClassificationRule from '#models/user_classification_rule'

export default class UserClassificationRulesSeeder extends BaseSeeder {
    async run() {
        await UserClassificationRule.create(
            {
                userId: 1,
                ncmPrefix: '1006',
                descriptionPattern: 'ARROZ',
                normalizedProductId: 1
            },
        )
    }
}
