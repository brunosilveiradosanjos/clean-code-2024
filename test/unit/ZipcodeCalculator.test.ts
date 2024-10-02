import ZipcodeCalculatorAPIMemory from '@/infra/gateway/memory/ZipcodeCalculatorAPIMemory'
import { describe, expect, it } from 'vitest'

describe('Zipcode Infrastructure Service ', () => {
  it('Should calculate distance between two zipcodes ', () => {
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
    const distance = zipcodeCalculator.calculate('11.111-11', '99.999-99')
    expect(distance).toBe(1000)
  })
})
