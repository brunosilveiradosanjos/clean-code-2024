export default class Cpf {
  value: string

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid CPF')
    this.value = value
  }

  public FACTOR_DIGIT_1 = 10
  public FACTOR_DIGIT_2 = 11
  public MAX_DIGITS_1 = 9
  public MAX_DIGITS_2 = 10

  validate(cpf = '') {
    cpf = this.extractDigits(cpf)
    if (this.isInvalidLength(cpf)) return false
    if (this.isBlocked(cpf)) return false
    const digit1 = this.calculateDigit(
      cpf,
      this.FACTOR_DIGIT_1,
      this.MAX_DIGITS_1,
    )
    const digit2 = this.calculateDigit(
      cpf,
      this.FACTOR_DIGIT_2,
      this.MAX_DIGITS_2,
    )
    const calculatedCheckDigit = `${digit1}${digit2}`
    return this.getCheckDigit(cpf) === calculatedCheckDigit
  }

  extractDigits(cpf: string): string {
    return cpf.replace(/\D/g, '')
  }

  isInvalidLength(cpf: string): boolean {
    return cpf.length !== 11
  }

  isBlocked(cpf: string) {
    const [digit1] = cpf
    return cpf.split('').every((digit) => digit === digit1)
  }

  calculateDigit(cpf: string, factor: number, max: number): number {
    let total = 0
    for (const digit of this.toDigitArray(cpf).slice(0, max)) {
      total += digit * factor--
    }
    return total % 11 < 2 ? 0 : 11 - (total % 11)
  }

  toDigitArray(cpf: string): Array<number> {
    return [...cpf].map((digit) => parseInt(digit))
  }

  getCheckDigit(cpf: string): string {
    return cpf.slice(9)
  }
}
