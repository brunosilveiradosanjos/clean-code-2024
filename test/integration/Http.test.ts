// import DatabaseRepositoryFactory from '@/infra/factory/DatabaseRepositoryFactory'
// import axios from 'axios'
import { afterEach, beforeEach, describe, it } from 'vitest'

describe('Axios API implementation ', () => {
  beforeEach(async () => {
    // const repositoryFactory = new DatabaseRepositoryFactory()
    // const orderRepository = repositoryFactory.createOrderRepository()
    // await orderRepository.clean()
  })

  afterEach(async () => {
    // const repositoryFactory = new DatabaseRepositoryFactory()
    // const orderRepository = repositoryFactory.createOrderRepository()
    // await orderRepository.clean()
  })

  it('Should call API [GET]/orders/{code}', async () => {
    // await axios({
    //   url: 'http://localhost:3000/orders',
    //   method: 'post',
    //   data: {
    //     cpf: '778.278.412-36',
    //     zipcode: '11.111-11',
    //     items: [
    //       { id: 1, price: 10000, quantity: 1 },
    //       { id: 2, price: 5000, quantity: 1 },
    //       { id: 3, price: 50, quantity: 2 },
    //     ],
    //     coupon: '20OFF',
    //   },
    // })
    //   const response = await axios({
    //     url: 'http://localhost:3000/orders/202400000001',
    //     method: 'get',
    //   })
    //   const order = response.data
    //   expect(order.code).toBe('202400000001')
    //   expect(order.freight).toBe(270)
    //   expect(order.total).toBe(12350)
  })

  it('Should call API [POST]/orders', async () => {
    // const response = await axios({
    //   url: 'http://localhost:3000/orders',
    //   method: 'post',
    //   data: {
    //     cpf: '778.278.412-36',
    //     zipcode: '11.111-11',
    //     items: [
    //       { id: 1, price: 10000, quantity: 1 },
    //       { id: 2, price: 5000, quantity: 1 },
    //       { id: 3, price: 50, quantity: 2 },
    //     ],
    //     coupon: '20OFF',
    //   },
    // })
    // expect(response.status).toEqual(200)
    // expect(response.data).toEqual(
    //   expect.objectContaining({
    //     freight: 270,
    //     total: 14615,
    //   }),
    // )
  })
})
