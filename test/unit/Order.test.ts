import Coupon from '@/domain/entity/Coupon'
import Order from '@/domain/entity/Order'
import { expect, describe, it } from 'vitest'

describe('Order Entity ', () => {
  const cpf = '778.278.412-36'
  it('Should not place order with invalid CPF ', () => {
    expect(() => new Order('111.111.111-08')).toThrowError('Invalid CPF')
  })

  it('Should place order with 3 itens ', () => {
    const order = new Order(cpf)
    order.addItem('1', 10000, 1)
    order.addItem('2', 5000, 1)
    order.addItem('3', 50, 2)
    expect(order.getTotal()).toBe(15100)
  })

  it('Should place order with discount cupon ', () => {
    const order = new Order(cpf)
    order.addItem('1', 10000, 1)
    order.addItem('2', 5000, 1)
    order.addItem('3', 50, 2)
    order.addCoupon(new Coupon('10OFF', 10, new Date('2041-01-01')))
    expect(order.getTotal()).toBe(13590)
  })

  it('Should place order with discount cupon for expired coupon ', () => {
    const order = new Order(cpf)
    order.addItem('1', 10000, 1)
    order.addItem('2', 5000, 1)
    order.addItem('3', 50, 2)
    order.addCoupon(new Coupon('10OFF', 10, new Date('2021-01-01')))
    expect(order.getTotal()).toBe(15100)
  })

  it('Should create order code', function () {
    const order = new Order(cpf, new Date('2020-10-10'), 2)
    order.addItem('1', 1000, 2)
    order.addItem('2', 5000, 1)
    order.addItem('3', 30, 3)
    order.addCoupon(new Coupon('20OFF', 20, new Date('2020-10-10')))
    expect(order.code.value).toBe('202000000002')
  })
})
