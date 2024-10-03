import Coupon from '@/domain/entity/Coupon'

export default interface CouponRepository {
  getByCode(code: string): Promise<Coupon | undefined>
}
