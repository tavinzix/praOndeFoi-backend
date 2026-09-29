import { BusinessException } from '#exceptions/AppExceptions'

export function validarId(id: number, nome: string): void {
    if (!Number.isInteger(id) || id <= 0) {
        throw new BusinessException(`ID ${nome} inválido`)
    }
}