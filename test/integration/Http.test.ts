import axios from 'axios'
import { describe, expect, it } from 'vitest'

describe('Axios API implementation ', () => {
  it('Should call API /orders/{code}', async () => {
    const response = await axios({
      url: 'http://localhost:3000/orders/202400000001',
      method: 'get',
    })
    const order = response.data
    expect(order.code).toBe('202400000001')
    expect(order.freight).toBe(310)
    expect(order.total).toBe(25460)
  })
})
