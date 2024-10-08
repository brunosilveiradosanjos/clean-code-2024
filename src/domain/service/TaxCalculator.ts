import Item from '@/domain/entity/Item'
import TaxTable from '@/domain/entity/TaxTable'

export default abstract class TaxCalculator {
  calculate(item: Item, taxTables: TaxTable[]) {
    return (item.price * this.getTax(taxTables)) / 100
  }

  abstract getTax(taxTables: TaxTable[]): number
}
