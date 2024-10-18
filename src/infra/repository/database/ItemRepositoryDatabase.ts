import Item from '@/domain/entity/Item'
import ItemRepository from '@/domain/repository/ItemRepository'
import Database from '@/infra/database/Database'
import { env } from '@/infra/env/environment'

export default class ItemRepositoryDatabase implements ItemRepository {
  database: Database

  constructor(database: Database) {
    this.database = database
  }

  async getById(id: number): Promise<Item | undefined> {
    if (id) {
      const itemData = await this.database.one(
        `select * from ${env.DATABASE_SCHEMA}.item where id = $1`,
        [id],
      )
      return new Item(
        itemData.id,
        itemData.description,
        itemData.price,
        itemData.width,
        itemData.height,
        itemData.length,
        itemData.weight,
      )
    }
    throw new Error('Item not found')
  }

  async getAll(): Promise<Item[]> {
    let items: Item[] = []
    items = await this.database.many(
      `select * from ${env.DATABASE_SCHEMA}.item`,
      [],
    )
    return items
  }
}
