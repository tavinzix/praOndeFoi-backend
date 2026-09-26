import env from '#start/env'

const stripeConfig = {
    secretKey: env.get('STRIPE_SECRET_KEY'),
    publishableKey: env.get('STRIPE_PUBLISHABLE_KEY'),
    webhookSecret: env.get('STRIPE_WEBHOOK_SECRET'),
}

export default stripeConfig