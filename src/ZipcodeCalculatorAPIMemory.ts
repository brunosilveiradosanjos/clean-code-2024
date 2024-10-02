import ZipcodeCalculatorAPI from '@/ZipcodeCalculatorAPI'

export default class ZipcodeCalculatorAPIMemory
  implements ZipcodeCalculatorAPI
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  calculate(zipcodeA: string, zipcodeB: string): number {
    return 1000
  }
}
