import RepositoryFactory from '@/domain/factory/RepositoryFactory'
import ItemRepository from '@/domain/repository/ItemRepository'
import GetItemOutput from './GetItemOutput'

export default class GetItems {
  itemsRepository: ItemRepository

  constructor(repositoryFactory: RepositoryFactory) {
    this.itemsRepository = repositoryFactory.createItemRepository()
  }

  async execute(): Promise<GetItemOutput[]> {
    let items: GetItemOutput[] = []
    items = await this.itemsRepository.getAll()
    return items
  }
}
