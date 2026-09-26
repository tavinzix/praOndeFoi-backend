import { BaseSeeder } from '@adonisjs/lucid/seeders'
import FormaPagamento from '#models/forma_pagamento'

export default class FormaPagamentoSeeder extends BaseSeeder {
    public async run() {
        await FormaPagamento.createMany([
            {
                userId: 1,
                nomeCartao: "Visa crédito",
                nomeTitular: "",
                stripePaymentMethodId: "pm_1TxdBnA9vmHNLwxikH92VPLS",
                bandeira: "visa",
                ultimos4: "4242",
                mesExpiracao: 7,
                anoExpiracao: 2027,
                principal: true,
                ativo: true,
            },
            {
                userId: 1,
                nomeCartao: "Master crédito",
                nomeTitular: "",
                stripePaymentMethodId: "pm_1TxdCSA9vmHNLwxiykRe1NYC",
                bandeira: "mastercard",
                ultimos4: "4444",
                mesExpiracao: 7,
                anoExpiracao: 2027,
                principal: false,
                ativo: true,
            },
            {
                userId: 1,
                nomeCartao: "Master débito",
                nomeTitular: "",
                stripePaymentMethodId: "pm_1TxdDGA9vmHNLwxiykzWBWtt",
                bandeira: "mastercard",
                ultimos4: "8210",
                mesExpiracao: 7,
                anoExpiracao: 2027,
                principal: false,
                ativo: true,
            },
            {
                userId: 1,
                nomeCartao: "Janela cobrança",
                nomeTitular: "",
                stripePaymentMethodId: "pm_1TxpFuA9vmHNLwxiwvH2GqrO",
                bandeira: "visa",
                ultimos4: "3184",
                mesExpiracao: 7,
                anoExpiracao: 2027,
                principal: false,
                ativo: true,
            },
        ])
    }
}
