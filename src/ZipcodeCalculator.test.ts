import { describe, expect, it } from 'vitest'
import ZipcodeCalculatorAPIMemory from './ZipcodeCalculatorAPIMemory'

describe('Zipcode Infrastructure Service ', () => {
  it('Should calculate distance between two zipcodes ', () => {
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
    const distance = zipcodeCalculator.calculate('11.111-11', '99.999-99')
    expect(distance).toBe(1000)
  })
})
