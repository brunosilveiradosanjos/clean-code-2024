import Coupon from './Coupon'
import CouponRepository from './CouponRepository'

export default class CouponRepositoryMemory implements CouponRepository {
  private coupons: Array<Coupon>
  constructor() {
    this.coupons = [
      new Coupon('10OFF', 10, new Date('2041-01-01')),
      new Coupon('20OFF', 20, new Date('2001-01-01')),
    ]
  }

  getByCode(code: string): Coupon | undefined {
    return this.coupons.find((coupon) => coupon.code === code)
  }
}
