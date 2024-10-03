import { describe, expect, it } from 'vitest'
import GetOrder from '@/application/GetOrder'
import PlaceOrder from '@/application/PlaceOrder'
import PlaceOrderInput from '@/application/PlaceOrderInput'
import ZipcodeCalculatorAPIMemory from '@/infra/gateway/memory/ZipcodeCalculatorAPIMemory'
import DatabaseRepositoryFactory from '@/infra/factory/DatabaseRepositoryFactory'

describe('Order Integration', () => {
  it('Should get order', async function () {
    const input = new PlaceOrderInput({
      cpf: '778.278.412-36',
      zipcode: '11.111-11',
      items: [
        { id: '1', quantity: 2 },
        { id: '2', quantity: 1 },
        { id: '3', quantity: 3 },
      ],
      coupon: '20OFF',
    })

    const repositoryFactory = new DatabaseRepositoryFactory()
    const orderRepository = repositoryFactory.createOrderRepository()
    // const orderRepository = OrderRepositoryMemory.getInstance();
    await orderRepository.clean()
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
    const placeOrder = new PlaceOrder(repositoryFactory, zipcodeCalculator)
    const output = await placeOrder.execute(input)
    const getOrder = new GetOrder(repositoryFactory)
    const getOrderOutput = await getOrder.execute(output.code)
    expect(getOrderOutput.total).toBe(25460)
  })
})
