import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
        table.increments('id').primary()
        table.string('nome_completo').nullable()
        table.string('email').notNullable().unique()
        table.string('cpf').notNullable()
        table.string('senha').notNullable()
        table.string('telefone', 20)
        table.date('dt_nasc').notNullable()
        table.timestamp('data_criacao').notNullable()
        table.enu('status', ['1', '2', '3']).defaultTo('1').comment('1 = ativo, 2 = inativo, 3 = banido')
        table.string('img_user', 250).defaultTo('https://res.cloudinary.com/dapcd8spu/image/upload/v1780873165/avatar.jpg')
        table.boolean('email_verificado').defaultTo(false)
        table.string('stripe_customer_id').nullable().unique()
        table.timestamp('data_atualizacao', { useTz: true }).defaultTo(this.now()).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}