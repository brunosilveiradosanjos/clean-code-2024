export default class Coupon {
  public code: string
  public discountPercentage: number
  public expiration: Date

  constructor(code: string, discountPercentage: number, expiration: Date) {
    this.code = code
    this.discountPercentage = discountPercentage
    this.expiration = expiration
  }

  isExpired(): boolean {
    return this.expiration.getTime() < new Date().getTime()
  }
}
