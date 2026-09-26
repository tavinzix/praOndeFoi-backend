import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ConfiguracoesSistema from '#models/configuracoes_sistema'

export default class ConfiguracoesSistemaSeeder extends BaseSeeder {
    public async run() {
        await ConfiguracoesSistema.createMany([
            {
                usuarioSuporte: 1,
                taxaPlataforma: 10,
            }
        ])
    }
}
