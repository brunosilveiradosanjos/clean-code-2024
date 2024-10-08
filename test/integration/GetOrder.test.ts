import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import GetOrder from '@/application/get-order/GetOrder'
import PlaceOrderInput from '@/application/place-order/PlaceOrderInput'
import ZipcodeCalculatorAPIMemory from '@/infra/gateway/memory/ZipcodeCalculatorAPIMemory'
import DatabaseRepositoryFactory from '@/infra/factory/DatabaseRepositoryFactory'
import PlaceOrder from '@/application/place-order/PlaceOrder'
import RepositoryFactory from '@/domain/factory/RepositoryFactory'
import ZipcodeCalculatorAPI from '@/domain/gateway/ZipcodeCalculatorAPI'

describe('Order Integration', () => {
  let repositoryFactory: RepositoryFactory
  let zipcodeCalculator: ZipcodeCalculatorAPI

  beforeEach(async () => {
    repositoryFactory = new DatabaseRepositoryFactory()
    const orderRepository = repositoryFactory.createOrderRepository()
    await orderRepository.clean()
    // const stockEntryRepository = repositoryFactory.createStockEntryRepository()
    // await stockEntryRepository.clean()
    zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
  })

  afterEach(async () => {
    // const orderRepository = repositoryFactory.createOrderRepository()
    // await orderRepository.clean()
  })

  it('Should get order', async () => {
    const input = new PlaceOrderInput({
      cpf: '778.278.412-36',
      zipcode: '11.111-11',
      items: [{ idItem: 1, quantity: 1 }],
      coupon: '10OFF',
    })
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    const output = await placeOrder.execute(input)
    const getOrder = new GetOrder(repositoryFactory)
    const getOrderOutput = await getOrder.execute(output.code)
    expect(getOrderOutput.total).toBe(5982)
  })
})
