const generateRandomNumber = (length: number) => {
  const min = 10 ** (length - 1)
  const max = 10 ** length - 1
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const mockCpfCnpj = () => {
  const isCpf = Math.random() < 0.5 // 50% chance of generating CPF

  if (isCpf) {
    const cpfNumber = generateRandomNumber(11)
    return `CPF_${cpfNumber}`
  } else {
    const cnpjNumber = generateRandomNumber(14)
    return `CNPJ_${cnpjNumber}`
  }
}
