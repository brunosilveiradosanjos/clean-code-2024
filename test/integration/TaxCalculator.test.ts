import Item from '@/domain/entity/Item'
import TaxTable from '@/domain/entity/TaxTable'
import TaxCalculatorFactory from '@/domain/factory/TaxCalculatorFactory'
import { describe, expect, it } from 'vitest'

describe('Tax Calculator', () => {
  it('Should calculate the tax for a Guitar item in regular months', () => {
    const item = new Item(1, 'Guitar', 1000, 100, 50, 30, 8)
    const taxTables = [
      new TaxTable(1, 'default', 15),
      new TaxTable(1, 'november', 5),
    ]
    const date = new Date('2024-10-10')
    const taxCalculator = TaxCalculatorFactory.create(date)
    const amount = taxCalculator.calculate(item, taxTables)
    expect(amount).toBe(150)
  })

  it('Should calculate the tax for a Guitar item in November', () => {
    const item = new Item(1, 'Guitar', 1000, 100, 50, 30, 8)
    const taxTables = [
      new TaxTable(1, 'default', 15),
      new TaxTable(1, 'november', 5),
    ]
    const date = new Date('2024-11-10')
    const taxCalculator = TaxCalculatorFactory.create(date)
    const amount = taxCalculator.calculate(item, taxTables)
    expect(amount).toBe(50)
  })

  it('Should calculate the tax for a Cable item in regular months', () => {
    const item = new Item(3, 'Cable', 30, 10, 10, 10, 1)
    const taxTables = [
      new TaxTable(3, 'default', 5),
      new TaxTable(3, 'november', 1),
    ]
    const date = new Date('2024-10-10')
    const taxCalculator = TaxCalculatorFactory.create(date)
    const amount = taxCalculator.calculate(item, taxTables)
    expect(amount).toBe(1.5) // 5%
  })

  it('Should calculate the tax for a Cable item in November', () => {
    const item = new Item(3, 'Cabo', 30, 10, 10, 10, 1)
    const taxTables = [
      new TaxTable(3, 'default', 5),
      new TaxTable(3, 'november', 1),
    ]
    const date = new Date('2024-11-10')
    const taxCalculator = TaxCalculatorFactory.create(date)
    const amount = taxCalculator.calculate(item, taxTables)
    expect(amount).toBe(0.3) // 1%
  })
})
