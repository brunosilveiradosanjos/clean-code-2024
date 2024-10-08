import StockEntry from '@/domain/entity/StockEntry'

export default interface StockEntryRepository {
  getByIdItem(idItem: number): Promise<StockEntry[]>
  save(stockEntry: StockEntry): Promise<void>
  clean(): Promise<void>
}
