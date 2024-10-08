import { describe, expect, it } from 'vitest'
import StockEntry from '@/domain/entity/StockEntry'
import StockCalculator from '@/domain/service/StockCalculator'

describe('Stock Calculator Integration ', () => {
  it('Should calculate stock item', function () {
    const stockEntries = [
      new StockEntry(1, 'in', 3, new Date('2024-10-10')),
      new StockEntry(1, 'out', 2, new Date('2024-10-10')),
      new StockEntry(1, 'in', 2, new Date('2024-10-10')),
    ]
    const stockCalculator = new StockCalculator()
    const quantity = stockCalculator.calculate(stockEntries)
    expect(quantity).toBe(3)
  })
})
