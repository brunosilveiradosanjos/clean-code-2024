export default class Coupon {
  public description: string
  public discountPercentage: number
  public expiration: Date

  constructor(
    description: string,
    discountPercentage: number,
    expiration: Date,
  ) {
    this.description = description
    this.discountPercentage = discountPercentage
    this.expiration = expiration
  }

  isExpired(): boolean {
    return this.expiration.getTime() < new Date().getTime()
  }
}
