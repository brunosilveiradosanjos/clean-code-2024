import GetItemOutput from '@/application/get-item/GetItemOutput'
import GetItems from '@/application/get-item/GetItems'
import RepositoryFactory from '@/domain/factory/RepositoryFactory'
import DatabaseRepositoryFactory from '@/infra/factory/DatabaseRepositoryFactory'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Get Items Integration ', () => {
  let repositoryFactory: RepositoryFactory
  beforeEach(async () => {
    repositoryFactory = new DatabaseRepositoryFactory()
    const setupTest = repositoryFactory.createSetupTestRepository()
    await setupTest.setup()
  })
  it('should get all items', async () => {
    const getItems = new GetItems(repositoryFactory)
    const items: GetItemOutput[] = await getItems.execute()
    for (const item of items) {
      expect(item).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          description: expect.any(String),
          //   price: expect.any(Number),
          width: expect.any(Number),
          height: expect.any(Number),
          length: expect.any(Number),
          weight: expect.any(Number),
        }),
      )
    }
  })
})
