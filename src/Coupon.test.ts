import { describe, expect, it } from 'vitest'
import Coupon from './Coupon'

describe('Order Entity ', () => {
  it('Should verify if coupon is expired ', () => {
    const coupon = new Coupon('10OFF', 10, new Date('2021-01-01'))
    expect(coupon.isExpired()).toBeTruthy()
  })

  it('Should verify if coupon is not expired ', () => {
    const coupon = new Coupon('10OFF', 10, new Date('2041-01-01'))
    expect(coupon.isExpired()).toBeFalsy()
  })
})
