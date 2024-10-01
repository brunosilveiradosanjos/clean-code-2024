import { expect, describe, it } from 'vitest'
import PlaceOrder from './PlaceOrder'
import PlaceOrderInput from './PlaceOrderInput'
import PlaceOrderOutput from './PlaceOrderOutput'

describe('Place Order Use Case ', () => {
  it('Should place order ', () => {
    const placeOrderInput = new PlaceOrderInput({
      cpf: '778.278.412-36',
      items: [
        { description: 'Guitar', price: 10000, quantity: 1 },
        { description: 'Amplificator', price: 5000, quantity: 1 },
        { description: 'Cabo', price: 50, quantity: 2 },
      ],
      coupon: '10OFF',
    })
    const placeOrder = new PlaceOrder()
    const output = new PlaceOrderOutput(placeOrder.execute(placeOrderInput))
    expect(output.total).toBe(13590)
  })

  it('Should place order with expired coupon ', () => {
    const placeOrderInput = new PlaceOrderInput({
      cpf: '778.278.412-36',
      items: [
        { description: 'Guitar', price: 10000, quantity: 1 },
        { description: 'Amplificator', price: 5000, quantity: 1 },
        { description: 'Cabo', price: 50, quantity: 2 },
      ],
      coupon: '20OFF',
    })
    const placeOrder = new PlaceOrder()
    const output = new PlaceOrderOutput(placeOrder.execute(placeOrderInput))
    expect(output.total).toBe(15100)
  })
})
