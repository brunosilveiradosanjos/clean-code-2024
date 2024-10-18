import { beforeEach, describe, expect, it } from 'vitest'
import PgPromiseDatabase from '@/infra/database/PgPromiseDatabase'
import { env } from '@/infra/env/environment'

describe('Postgres Database implementation ', () => {
  let pgPromiseDatabase: PgPromiseDatabase

  beforeEach(() => {
    pgPromiseDatabase = PgPromiseDatabase.getInstance()
  })

  it('Should establish a connection to the database and filter one items', async () => {
    const item = await pgPromiseDatabase.one(
      `select * from ${env.DATABASE_SCHEMA}.item where id = $1`,
      [1],
    )
    expect(item.description).toBe('Guitar')
  })
})
