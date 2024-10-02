import Item from '@/domain/entity/Item'
import { describe, expect, it } from 'vitest'

describe('Item Entity ', () => {
  it('Should calculate the item volume ', () => {
    const item = new Item('1', 'Guitar', 5000, 50, 50, 50, 22)
    const volume = item.getVolume()
    expect(volume).toBe((50 / 100) * (50 / 100) * (50 / 100))
  })

  it('Should calculate the item density ', () => {
    const item = new Item('1', 'Guitar', 5000, 50, 50, 50, 22)
    const density = item.getDensity()
    expect(density).toBe(22 / ((50 / 100) * (50 / 100) * (50 / 100)))
  })
})
