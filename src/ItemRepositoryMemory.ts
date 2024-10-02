import Item from './Item'
import ItemRepository from './ItemRepository'

export default class ItemRepositoryMemory implements ItemRepository {
  private items: Item[]
  constructor() {
    this.items = [
      new Item('1', 'Guitar', 10000, 100, 50, 15, 3),
      new Item('2', 'Amplifier', 5000, 50, 50, 50, 22),
      new Item('3', 'Cable', 50, 30, 10, 10, 1),
    ]
  }

  getById(id: string): Item | undefined {
    return this.items.find((item) => item.id === id)
  }
}
