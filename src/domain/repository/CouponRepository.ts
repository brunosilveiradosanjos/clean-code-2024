import Coupon from '@/domain/entity/Coupon'

export default interface CouponRepository {
  getByCode(code: string): Coupon | undefined
}
