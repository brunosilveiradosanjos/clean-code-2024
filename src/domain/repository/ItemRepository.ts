import Item from '@/domain/entity/Item'

export default interface ItemRepository {
  getById(id: string): Item | undefined
}
