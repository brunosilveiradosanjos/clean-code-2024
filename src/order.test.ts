import { expect, describe, it } from 'vitest'
import Order from './order'
import OrderItem from './orderItem'
import Coupon from './coupon'

describe('Order Entity ', () => {
  it('Should not place order with invalid CPF ', () => {
    expect(() => new Order('111.111.111-08')).toThrowError('Invalid CPF')
  })

  it('Should place order with 3 itens ', () => {
    const order = new Order('778.278.412-36')
    order.addItem(new OrderItem('Guitar', 10000, 1))
    order.addItem(new OrderItem('Amplificator', 5000, 1))
    order.addItem(new OrderItem('Cabo', 50, 2))
    expect(order.getTotal()).toBe(15100)
  })

  it('Should place order with discount cupon ', () => {
    const order = new Order('778.278.412-36')
    order.addItem(new OrderItem('Guitar', 10000, 1))
    order.addItem(new OrderItem('Amplificator', 5000, 1))
    order.addItem(new OrderItem('Cabo', 50, 2))
    order.addCoupon(new Coupon('10OFF', 10))
    expect(order.getTotal()).toBe(13590)
  })
})
