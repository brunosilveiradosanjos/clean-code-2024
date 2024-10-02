import { expect, describe, it, beforeEach } from 'vitest'
import PlaceOrder from './PlaceOrder'
import PlaceOrderInput from './PlaceOrderInput'
import PlaceOrderOutput from './PlaceOrderOutput'
import ItemRepositoryMemory from './ItemRepositoryMemory'
import CouponRepositoryMemory from './CouponRepositoryMemory'
import OrderRepositoryMemory from './OrderRepositoryMemory'
import ZipcodeCalculatorAPIMemory from './ZipcodeCalculatorAPIMemory'

let itemRepository: ItemRepositoryMemory
let couponRepository: CouponRepositoryMemory
let orderRepository: OrderRepositoryMemory
let zipcodeCalculator: ZipcodeCalculatorAPIMemory
let placeOrder: PlaceOrder // system under test

describe('Place Order Use Case ', () => {
  beforeEach(() => {
    itemRepository = new ItemRepositoryMemory()
    couponRepository = new CouponRepositoryMemory()
    orderRepository = new OrderRepositoryMemory()
    zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
    placeOrder = new PlaceOrder(
      itemRepository,
      couponRepository,
      orderRepository,
      zipcodeCalculator,
    )
  })

  it('Should place order ', () => {
    const placeOrderInput = new PlaceOrderInput({
      cpf: '778.278.412-36',
      zipcode: '11.111-11',
      items: [
        { id: '1', price: 10000, quantity: 1 },
        { id: '2', price: 5000, quantity: 1 },
        { id: '3', price: 50, quantity: 2 },
      ],
      coupon: '10OFF',
    })
    const output = new PlaceOrderOutput(placeOrder.execute(placeOrderInput))
    expect(output.total).toBe(13590 + 270)
  })

  it('Should place order with expired coupon ', () => {
    const placeOrderInput = new PlaceOrderInput({
      cpf: '778.278.412-36',
      zipcode: '11.111-11',
      items: [
        { id: '1', price: 10000, quantity: 1 },
        { id: '2', price: 5000, quantity: 1 },
        { id: '3', price: 50, quantity: 2 },
      ],
      coupon: '20OFF',
    })
    const output = new PlaceOrderOutput(placeOrder.execute(placeOrderInput))
    expect(output.total).toBe(15100 + 270)
  })

  it('Should calculate shipping price ', () => {
    const placeOrderInput = new PlaceOrderInput({
      cpf: '778.278.412-36',
      zipcode: '11.111-11',
      items: [
        { id: '1', price: 10000, quantity: 1 },
        { id: '2', price: 5000, quantity: 1 },
        { id: '3', price: 50, quantity: 2 },
      ],
      coupon: '20OFF',
    })
    const output = new PlaceOrderOutput(placeOrder.execute(placeOrderInput))
    expect(output.freight).toBe(270)
  })
})
