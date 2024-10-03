import { expect, describe, it, beforeEach } from 'vitest'
import ZipcodeCalculatorAPIMemory from '@/infra/gateway/memory/ZipcodeCalculatorAPIMemory'
import PlaceOrder from '@/application/PlaceOrder'
import PlaceOrderInput from '@/application/PlaceOrderInput'
import MemoryRepositoryFactory from '@/infra/factory/MemoryRepositoryRepository'
import OrderRepositoryMemory from '@/infra/repository/memory/OrderRepositoryMemory'
import { afterEach } from 'node:test'

let zipcodeCalculator: ZipcodeCalculatorAPIMemory
let repositoryFactory: MemoryRepositoryFactory
let orderRepository: OrderRepositoryMemory

let placeOrder: PlaceOrder // system under test

describe('Place Order Use Case ', () => {
  const cpf = '778.278.412-36'
  const zipcode = '11.111-11'
  const items = [
    { id: '1', price: 10000, quantity: 1 },
    { id: '2', price: 5000, quantity: 1 },
    { id: '3', price: 50, quantity: 2 },
  ]

  beforeEach(() => {
    zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
    repositoryFactory = new MemoryRepositoryFactory()
    orderRepository = OrderRepositoryMemory.getInstance()
    placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
  })
  afterEach(async () => {
    await orderRepository.clean()
  })

  it('Should place order ', async () => {
    const placeOrderInput = new PlaceOrderInput({
      cpf,
      zipcode,
      items,
      coupon: '10OFF',
    })
    const output = await placeOrder.execute(placeOrderInput)
    expect(output.total).toBe(13590 + 270)
  })

  it('Should place order with expired coupon ', async () => {
    const placeOrderInput = new PlaceOrderInput({
      cpf,
      zipcode,
      items,
      coupon: '20OFF_EXPIRED',
    })
    const output = await placeOrder.execute(placeOrderInput)
    expect(output.total).toBe(15100 + 270)
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
    expect(output.code).toBe('202400000004')
  })
})
