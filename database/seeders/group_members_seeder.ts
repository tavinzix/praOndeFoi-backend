import { BaseSeeder } from '@adonisjs/lucid/seeders'
import GroupMember from '#models/group_member'

export default class GroupMembersSeeder extends BaseSeeder {
    async run() {
        await GroupMember.create(
            {
                gfId: 1,
                userId: 1
            },
        )
    }
}