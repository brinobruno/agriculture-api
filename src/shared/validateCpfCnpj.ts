import { cnpj, cpf } from 'cpf-cnpj-validator'
import { z } from 'zod'

import { CONSTANTS } from './constants'

export const cpfCnpjValidator = (cpfOrCnpjValue: string) => {
  // \D = any non-digit/numeric character
  // /g = "global" -> Replace all that match the pattern \D
  const cleanedValue = cpfOrCnpjValue.replace(/\D/g, '')

  const isValidCpfOrCnpj =
    cleanedValue.length === CONSTANTS.CPF_NUMBERS_AMOUNT
      ? cpf.isValid(cleanedValue)
      : cnpj.isValid(cleanedValue)

  if (!isValidCpfOrCnpj) {
    throw new z.ZodError([
      {
        code: 'invalid_string',
        message: 'Invalid CPF or CNPJ',
        path: [],
        validation: 'regex',
      },
    ])
  }

  return cleanedValue
}
