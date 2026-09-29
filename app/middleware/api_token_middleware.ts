import { timingSafeEqual } from 'node:crypto'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import env from '#start/env'

export default class ApiTokenMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const providedToken = ctx.request.header('tokenapi')
    const expectedToken = env.get('TOKENAPI')

    if (!providedToken || providedToken.length !== expectedToken.length) {
      return ctx.response.unauthorized({ message: 'Token da API inválido ou ausente' })
    }

    const provided = Buffer.from(providedToken)
    const expected = Buffer.from(expectedToken)

    if (!timingSafeEqual(provided, expected)) {
      return ctx.response.unauthorized({ message: 'Token da API inválido ou ausente' })
    }

    await next()
  }
}
