import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import {
    UnauthorizedException,
    ForbiddenException,
    BusinessException,
    NotFoundException,
} from '#exceptions/AppExceptions'

export default class HttpExceptionHandler extends ExceptionHandler {
    protected debug = !app.inProduction

    async handle(error: any, ctx: HttpContext) {
        if (error.code === 'E_VALIDATION_ERROR') {
            return ctx.response.badRequest({
                errors: error.messages,
            })
        }

        if (error instanceof UnauthorizedException) {
            return ctx.response.unauthorized({
                message: error.message,
            })
        }

        if (error instanceof ForbiddenException) {
            return ctx.response.forbidden({
                message: error.message,
            })
        }

        if (error instanceof BusinessException) {
            return ctx.response.badRequest({
                message: error.message,
            })
        }
        
        if (error instanceof NotFoundException) {
            return ctx.response.notFound({
                message: error.message,
            })
        }

        return ctx.response.internalServerError({
            message: error.message,
            stack: this.debug ? error.stack : undefined,
        })
    }
}