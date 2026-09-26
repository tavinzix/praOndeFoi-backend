import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Pedido from '#models/pedido'
import { DateTime } from 'luxon'

export default class PedidoSeeder extends BaseSeeder {
    public async run() {
        await Pedido.createMany([
            {
                usuarioId: 1,
                endereco_entrega_id: 1,
                forma_pagamento_id: 1,
                dataPedido: DateTime.fromISO('2026-07-27T10:21:57.244-03'),
                valorTotal: 59.80,
                stripePaymentIntentId: 'pi_3TxoThA9vmHNLwxi0kqt4lsq'
            },
            {
                usuarioId: 1,
                endereco_entrega_id: 1,
                forma_pagamento_id: 1,
                dataPedido: DateTime.fromISO('2026-07-27T10:26:10.541-03'),
                valorTotal: 725.00,
                stripePaymentIntentId: 'pi_3TxoXmA9vmHNLwxi1UNuk4Ej'
            },
            {
                usuarioId: 1,
                endereco_entrega_id: 1,
                forma_pagamento_id: 1,
                dataPedido: DateTime.fromISO('2026-07-27T10:55:11.436-03'),
                valorTotal: 15.00,
                stripePaymentIntentId: 'pi_3TxozrA9vmHNLwxi1pIuo47x'
            },
            {
                usuarioId: 1,
                endereco_entrega_id: 1,
                forma_pagamento_id: 1,
                dataPedido: DateTime.fromISO('2026-07-27T10:21:57.244-03'),
                valorTotal: 59.80,
                stripePaymentIntentId: 'pi_3TxoThA9vmHNLwxi0kqt4lsq'
            },
            {
                usuarioId: 1,
                endereco_entrega_id: 1,
                forma_pagamento_id: 2,
                dataPedido: DateTime.fromISO('2026-07-27T10:58:13.934-03'),
                valorTotal: 60,
                stripePaymentIntentId: 'pi_3Txp2nA9vmHNLwxi1ZuGlchE'
            },
            {
                usuarioId: 1,
                endereco_entrega_id: 1,
                forma_pagamento_id: 3,
                dataPedido: DateTime.fromISO('2026-07-27T10:59:14.452-03'),
                valorTotal: 35,
                stripePaymentIntentId: 'pi_3Txp3mA9vmHNLwxi0ckOJQb8'
            },
            {
                usuarioId: 1,
                endereco_entrega_id: 1,
                forma_pagamento_id: 2,
                dataPedido: DateTime.fromISO('2026-07-27T11:00:02.75-03'),
                valorTotal: 10,
                stripePaymentIntentId: 'pi_3Txp4YA9vmHNLwxi1cKd2gE0'
            },
            {
                usuarioId: 1,
                endereco_entrega_id: 1,
                forma_pagamento_id: 1,
                dataPedido: DateTime.fromISO('2026-07-27T11:02:22.06-03'),
                valorTotal: 28,
                stripePaymentIntentId: 'pi_3Txp6oA9vmHNLwxi0b0QhtT9'
            },
            {
                usuarioId: 1,
                endereco_entrega_id: 1,
                forma_pagamento_id: 3,
                dataPedido: DateTime.fromISO('2026-07-27T11:03:05.298-03'),
                valorTotal: 120,
                stripePaymentIntentId: 'pi_3Txp7VA9vmHNLwxi1qT4Ca1z'
            },
            {
                usuarioId: 1,
                endereco_entrega_id: 1,
                forma_pagamento_id: 1,
                dataPedido: DateTime.fromISO('2026-07-27T11:03:44.232-03'),
                valorTotal: 77.96,
                stripePaymentIntentId: 'pi_3Txp88A9vmHNLwxi1paW0B7C'
            },
            {
                usuarioId: 1,
                endereco_entrega_id: 1,
                forma_pagamento_id: 2,
                dataPedido: DateTime.fromISO('2026-07-27T11:06:05.965-03'),
                valorTotal: 78,
                stripePaymentIntentId: 'pi_3TxpAPA9vmHNLwxi0EjvY6VW'
            },
            {
                usuarioId: 1,
                endereco_entrega_id: 1,
                forma_pagamento_id: 1,
                dataPedido: DateTime.fromISO('2026-07-27T11:08:25.263-03'),
                valorTotal: 75,
                stripePaymentIntentId: 'pi_3TxpCfA9vmHNLwxi0pWl99JF'
            },
            {
                usuarioId: 1,
                endereco_entrega_id: 1,
                forma_pagamento_id: 2,
                dataPedido: DateTime.fromISO('2026-07-27T11:10:15.925-03'),
                valorTotal: 120,
                stripePaymentIntentId: 'pi_3TxpERA9vmHNLwxi0GeTqp2Q'
            },
            {
                usuarioId: 1,
                endereco_entrega_id: 1,
                forma_pagamento_id: 4,
                dataPedido: DateTime.fromISO('2026-07-27T11:12:08.275-03'),
                valorTotal: 199.90,
                stripePaymentIntentId: 'pi_3TxpGGA9vmHNLwxi1WYYTvsZ'
            },
        ])
    }
}
