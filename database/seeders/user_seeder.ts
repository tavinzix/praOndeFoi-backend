import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Users from '#models/users';

export default class UsuarioSeeder extends BaseSeeder {
    public async run() {
        await Users.createMany([
            {
                name: 'Otávio Faria Fagundes',
                email: 'otavio@email.com',
                password: '1',
            },
        ])
    }
}
