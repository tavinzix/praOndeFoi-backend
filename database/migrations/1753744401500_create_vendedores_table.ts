import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vendedores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
        table.increments('id').primary()
        table.integer('user_id').unsigned().notNullable()
        table.string('nome_loja', 255).notNullable()
        table.string('slug', 255).notNullable().unique()
        table.string('cnpj', 18).notNullable().unique()
        table.text('descricao_loja').notNullable()
        table.string('email').notNullable()
        table.string('telefone', 15).notNullable()
        table.string('categoria')
        table.string('cep', 9).notNullable()
        table.string('estado', 2).notNullable()
        table.string('cidade', 32).notNullable()
        table.string('bairro').notNullable()
        table.string('rua').notNullable()
        table.string('numero').notNullable()
        table.decimal('avaliacao_media', 3, 2).defaultTo(0.00)
        table.enu('status', ['0', '1', '2', '3', '4']).defaultTo('0').comment('0 = Pendente, 1 = Aprovado, 2 = Rejeitado, 3 = Banido, 4 = Inativo')
        table.string('img_vendedor', 255).notNullable().defaultTo('https://res.cloudinary.com/dapcd8spu/image/upload/v1780873303/semImagem.webp')
        table.string('stripe_account_id').nullable().unique()
        table.boolean('stripe_onboarding_completed').defaultTo(false)
        table.boolean('stripe_charges_enabled').defaultTo(false)
        table.boolean('stripe_payouts_enabled').defaultTo(false)
        table.timestamp('data_criacao').notNullable()
        table.timestamp('data_atualizacao', { useTz: true }).defaultTo(this.now()).nullable()

        table.foreign('user_id').references('id').inTable('usuarios').onDelete('CASCADE')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}