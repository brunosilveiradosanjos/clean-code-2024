import { expect, describe, it } from 'vitest'
import Coupon from './Coupon'
import OrderItem from './OrderItem'
import Order from './Order'

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
    order.addCoupon(new Coupon('10OFF', 10, new Date('2041-01-01')))
    expect(order.getTotal()).toBe(13590)
  })

  it('Should place order with discount cupon for expired coupon ', () => {
    const order = new Order('778.278.412-36')
    order.addItem(new OrderItem('Guitar', 10000, 1))
    order.addItem(new OrderItem('Amplificator', 5000, 1))
    order.addItem(new OrderItem('Cabo', 50, 2))
    order.addCoupon(new Coupon('10OFF', 10, new Date('2021-01-01')))
    expect(order.getTotal()).toBe(15100)
  })
})
