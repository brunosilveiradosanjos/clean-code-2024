import PlaceOrder from '@/application/place-order/PlaceOrder'
import PlaceOrderInput from '@/application/place-order/PlaceOrderInput'
import RepositoryFactory from '@/domain/factory/RepositoryFactory'
import ZipcodeCalculatorAPI from '@/domain/gateway/ZipcodeCalculatorAPI'
import DatabaseRepositoryFactory from '@/infra/factory/DatabaseRepositoryFactory'
import ZipcodeCalculatorAPIMemory from '@/infra/gateway/memory/ZipcodeCalculatorAPIMemory'
import { beforeEach, describe, expect, it } from 'vitest'

let repositoryFactory: RepositoryFactory
let zipcodeCalculator: ZipcodeCalculatorAPI

describe('Place Order Integration ', () => {
  beforeEach(async function () {
    repositoryFactory = new DatabaseRepositoryFactory()
    const orderRepository = repositoryFactory.createOrderRepository()
    await orderRepository.clean()
    // const stockEntryRepository = repositoryFactory.createStockEntryRepository()
    // await stockEntryRepository.clean()
    zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
  })
  it('Should place order', async function () {
    const input = new PlaceOrderInput({
      cpf: '778.278.412-36',
      zipcode: '11.111-11',
      items: [
        { idItem: 1, quantity: 2 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      coupon: '20OFF',
    })
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(5982)
  })

  it('Should place order with expired coupon', async function () {
    const input = new PlaceOrderInput({
      cpf: '778.278.412-36',
      zipcode: '11.111-11',
      items: [
        { idItem: 1, quantity: 2 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      coupon: '20OFF_EXPIRED',
    })
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(7400)
  })

  it('Should calculate shipping price', async function () {
    const input = new PlaceOrderInput({
      cpf: '778.278.412-36',
      zipcode: '11.111-11',
      items: [
        { idItem: 1, quantity: 2 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      coupon: '20OFF_EXPIRED',
    })
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    const output = await placeOrder.execute(input)
    expect(output.freight).toBe(310)
  })

  it('Should calculate order code', async function () {
    const input = new PlaceOrderInput({
      cpf: '778.278.412-36',
      zipcode: '11.111-11',
      items: [
        { idItem: 1, quantity: 2 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      issueDate: new Date('2021-10-10'),
      coupon: '20OFF_EXPIRED',
    })
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    await placeOrder.execute(input)
    const output = await placeOrder.execute(input)
    expect(output.code).toBe('202100000002')
  })

  it('Should calculate taxes', async function () {
    const input = new PlaceOrderInput({
      cpf: '778.278.412-36',
      zipcode: '11.111-11',
      items: [
        { idItem: 1, quantity: 2 }, // 1000 2x 300
        { idItem: 2, quantity: 1 }, // 5000 1x 750
        { idItem: 3, quantity: 3 }, // 30 3x 4.5
      ],
      coupon: '20OFF',
    })
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(5982)
    expect(output.taxes).toBe(1054.5)
  })

  // it('Não deve ser possível fazer um pedido de item sem estoque', async function () {
  //   const input = new PlaceOrderInput({
  //     cpf: '778.278.412-36',
  //     zipcode: '11.111-11',
  //     items: [{ idItem: 1, quantity: 12 }],
  //     coupon: '20OFF',
  //   })
  //   const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
  //   await expect(placeOrder.execute(input)).rejects.toThrow(
  //     new Error('Out of stock'),
  //   )
  // })
})
