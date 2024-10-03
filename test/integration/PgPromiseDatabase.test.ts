import { beforeAll, describe, expect, it } from 'vitest'
import PgPromiseDatabase from '@/infra/database/PgPromiseDatabase'

describe('Postgres Database implementation ', () => {
  let pgPromiseDatabase: PgPromiseDatabase

  beforeAll(() => {
    pgPromiseDatabase = new PgPromiseDatabase()
  })

  it('Should establish a connection to the database and list the items', async () => {
    const itens = await pgPromiseDatabase.many('select * from ccca.item', [])
    expect(itens).toHaveLength(3)
  })

  it('Should establish a connection to the database and filter one items', async () => {
    const item = await pgPromiseDatabase.one(
      'select * from ccca.item where id = $1',
      [1],
    )
    expect(item.description).toBe('Guitar')
  })
})
