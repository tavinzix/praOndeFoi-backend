export class AppException extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name
    }
}

export class UnauthorizedException extends AppException {
    constructor(message = 'Acesso negado') {
        super(message)
    }
}

export class ForbiddenException extends AppException {
    constructor(message = 'Sem permissão de acesso') {
        super(message)
    }
}

export class BusinessException extends AppException {
    constructor(message: string) {
        super(message)
    }
}

export class NotFoundException extends AppException {
    constructor(message: string) {
        super(message)
    }
}