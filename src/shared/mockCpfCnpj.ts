import { cnpj, cpf } from 'cpf-cnpj-validator'

export const mockCpfCnpj = () => {
  const isCpf = Math.random() < 0.5 // 50% chance of generating CPF

  if (isCpf) return cpf.generate()
  return cnpj.generate()
}
