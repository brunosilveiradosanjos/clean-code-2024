import FreightCalculator from '@/domain/service/FreightCalculator'
import Item from '@/domain/entity/Item'
import { describe, expect, it } from 'vitest'

describe('Freight Domain Service ', () => {
  it('Should calculate the guitar shipping price ', () => {
    const item = new Item(1, 'Guitar', 1000, 100, 50, 15, 3)
    const distance = 1000
    const price = FreightCalculator.calculate(distance, item)
    expect(price).toBe(30)
  })
  it('Should calculate the amplifier shipping price ', () => {
    const item = new Item(2, 'Amplifier', 5000, 50, 50, 50, 22)
    const distance = 1000
    const price = FreightCalculator.calculate(distance, item)
    expect(price).toBe(220)
  })
  it('Should calculate min shipping price ', () => {
    const item = new Item(3, 'Cable', 30, 9, 9, 9, 0.1)
    const distance = 1000
    const price = FreightCalculator.calculate(distance, item)
    expect(price).toBe(10)
  })
})
