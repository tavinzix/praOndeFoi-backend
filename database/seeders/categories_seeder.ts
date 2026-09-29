import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category'

export default class CategoriesSeeder extends BaseSeeder {
    async run() {
        await Category.createMany([
            { name: 'Comida', parentCategoryId: null },
            { name: 'Bebidas', parentCategoryId: null },
            { name: 'Limpeza', parentCategoryId: null },
            { name: 'Cuidados pessoais', parentCategoryId: null },
            { name: 'Arroz', parentCategoryId: 1 },
            { name: 'Feijão', parentCategoryId: 1 },
            { name: 'Leite', parentCategoryId: 1 },
            { name: 'Carne', parentCategoryId: 1 },
            { name: 'Massa', parentCategoryId: 1 },
            { name: 'Refrigerante', parentCategoryId: 2 },
            { name: 'Água', parentCategoryId: 2 },
            { name: 'Suco', parentCategoryId: 2 },
            { name: 'Detergente', parentCategoryId: 3 },
            { name: 'Sabão', parentCategoryId: 3 },
            { name: 'Desinfetante', parentCategoryId: 3 },
            { name: 'Shampoo', parentCategoryId: 4 },
            { name: 'Sabão corporal', parentCategoryId: 4 },
            { name: 'Pasta de dente', parentCategoryId: 4 },
        ])
    }
}
