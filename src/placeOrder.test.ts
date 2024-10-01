import { expect, describe, it } from 'vitest'
import PlaceOrder from './placeOrder'

describe('Place Order Use Case ', () => {
  it('Should place order ', () => {
    const placeOrderInput = {
      cpf: '778.278.412-36',
      items: [
        { description: 'Guitar', price: 10000, quantity: 1 },
        { description: 'Amplificator', price: 5000, quantity: 1 },
        { description: 'Cabo', price: 50, quantity: 2 },
      ],
      coupon: '10OFF',
    }
    const placeOrder = new PlaceOrder()
    const output = placeOrder.execute(placeOrderInput)
    expect(output.total).toBe(13590)
  })
})
