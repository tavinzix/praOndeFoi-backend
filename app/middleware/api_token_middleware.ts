import { timingSafeEqual } from 'node:crypto'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import env from '#start/env'

export default class ApiTokenMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const authorization = ctx.request.header('authorization')
    const expectedToken = `Bearer ${env.get('TOKENAPI')}`

    if (!authorization || authorization.length !== expectedToken.length) {
      return ctx.response.unauthorized({ message: 'Token da API inválido ou ausente' })
    }

    const provided = Buffer.from(authorization)
    const expected = Buffer.from(expectedToken)

    if (!timingSafeEqual(provided, expected)) {
      return ctx.response.unauthorized({ message: 'Token da API inválido ou ausente' })
    }

    await next()
  }
}
