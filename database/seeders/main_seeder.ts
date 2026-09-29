import { BaseSeeder } from '@adonisjs/lucid/seeders'
import CategoriesSeeder from '#database/seeders/categories_seeder'
import EstablishmentsSeeder from '#database/seeders/establishments_seeder'
import FamilyGroupsSeeder from '#database/seeders/family_groups_seeder'
import GroupMembersSeeder from '#database/seeders/group_members_seeder'
import NormalizedProductsSeeder from '#database/seeders/normalized_products_seeder'
import PurchaseItemsSeeder from '#database/seeders/purchase_items_seeder'
import PurchasesSeeder from '#database/seeders/purchases_seeder'
import UserClassificationRulesSeeder from '#database/seeders/user_classification_rules_seeder'

export default class MainSeeder extends BaseSeeder {
  async run() {
    await new CategoriesSeeder(this.client).run()
    await new EstablishmentsSeeder(this.client).run()
    await new FamilyGroupsSeeder(this.client).run()
    await new GroupMembersSeeder(this.client).run()
    await new NormalizedProductsSeeder(this.client).run()
    await new PurchasesSeeder(this.client).run()
    await new PurchaseItemsSeeder(this.client).run()
    await new UserClassificationRulesSeeder(this.client).run()
  }
}
