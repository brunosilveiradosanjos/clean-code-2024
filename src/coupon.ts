export default class Coupon {
  public description: string
  public discountPercentage: number

  constructor(description: string, discountPercentage: number) {
    this.description = description
    this.discountPercentage = discountPercentage
  }
}
