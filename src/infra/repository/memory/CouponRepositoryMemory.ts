import Coupon from '@/domain/entity/Coupon'
import CouponRepository from '@/domain/repository/CouponRepository'

export default class CouponRepositoryMemory implements CouponRepository {
  private coupons: Array<Coupon>
  constructor() {
    this.coupons = [
      new Coupon('10OFF', 10, new Date('2041-01-01')),
      new Coupon('20OFF', 20, new Date('2041-01-01')),
      new Coupon('20OFF_EXPIRED', 20, new Date('2001-01-01')),
    ]
  }

  async getByCode(code: string): Promise<Coupon | undefined> {
    return this.coupons.find((coupon) => coupon.code === code)
  }
}
