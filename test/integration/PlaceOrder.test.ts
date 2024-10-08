import { expect, describe, it, beforeEach } from 'vitest'
import PlaceOrderInput from '@/application/place-order/PlaceOrderInput'
import PlaceOrder from '@/application/place-order/PlaceOrder'
import RepositoryFactory from '@/domain/factory/RepositoryFactory'
import ZipcodeCalculatorAPI from '@/domain/gateway/ZipcodeCalculatorAPI'
import ZipcodeCalculatorAPIMemory from '@/infra/gateway/memory/ZipcodeCalculatorAPIMemory'
import DatabaseRepositoryFactory from '@/infra/factory/DatabaseRepositoryFactory'

let repositoryFactory: RepositoryFactory
let zipcodeCalculator: ZipcodeCalculatorAPI

let placeOrder: PlaceOrder // system under test

describe('Place Order Use Case ', () => {
  const cpf = '778.278.412-36'
  const zipcode = '11.111-11'
  const items = [
    { id: 1, price: 10000, quantity: 1 },
    { id: 2, price: 5000, quantity: 1 },
    { id: 3, price: 50, quantity: 2 },
  ]

  beforeEach(async () => {
    repositoryFactory = new DatabaseRepositoryFactory()
    const orderRepository = repositoryFactory.createOrderRepository()
    await orderRepository.clean()
    zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
    placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
  })

  it('Should place order ', async () => {
    const placeOrderInput = new PlaceOrderInput({
      cpf,
      zipcode,
      items,
      coupon: '10OFF',
    })
    const output = await placeOrder.execute(placeOrderInput)
    expect(output.total).toBe(5724)
  })

  it('Should place order with expired coupon ', async () => {
    const placeOrderInput = new PlaceOrderInput({
      cpf,
      zipcode,
      items,
      coupon: '20OFF_EXPIRED',
    })
    const output = await placeOrder.execute(placeOrderInput)
    expect(output.total).toBe(6330)
  })

  it('Should calculate shipping price ', async () => {
    const placeOrderInput = new PlaceOrderInput({
      cpf,
      zipcode,
      items,
      coupon: '20OFF',
    })
    const output = await placeOrder.execute(placeOrderInput)
    expect(output.freight).toBe(270)
  })

  it('Should calculate order code ', async () => {
    const placeOrderInput = new PlaceOrderInput({
      cpf,
      zipcode,
      items,
      coupon: '20OFF',
    })
    const output = await placeOrder.execute(placeOrderInput)
    expect(output.code).toBe('202400000001')
  })

  it('Should calculate taxes ', async () => {
    const placeOrderInput = new PlaceOrderInput({
      cpf,
      zipcode,
      items,
      coupon: '20OFF',
    })
    const output = await placeOrder.execute(placeOrderInput)
    expect(output.taxes).toBe(903)
  })
})
