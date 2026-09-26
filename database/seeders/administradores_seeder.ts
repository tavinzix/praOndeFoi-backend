import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Administradores from '#models/administradores';

export default class AdministradorSeeder extends BaseSeeder {
    public async run() {
        await Administradores.createMany([
            {
                userId: 1,
                status: '1',
            },
            {
                userId: 2,
                status: '1',
            },
            {
                userId: 3,
                status: '1',
            },
        ])
    }
}