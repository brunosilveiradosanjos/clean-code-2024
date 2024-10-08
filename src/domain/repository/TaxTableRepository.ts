import TaxTable from '@/domain/entity/TaxTable'

export default interface TaxTableRepository {
  getByIdItem(idItem: number): Promise<TaxTable[]>
}
