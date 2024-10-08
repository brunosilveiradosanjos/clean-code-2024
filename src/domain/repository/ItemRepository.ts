import Item from '@/domain/entity/Item'

export default interface ItemRepository {
  getById(id: number): Promise<Item | undefined>
}
