import Database from '@/infra/database/Database'
import { env } from '@/infra/env/environment'
import { readFile } from 'fs/promises'

export default class SetupTestRepositoryDatabase {
  database: Database
  setupQueryDirectory = './database/test/setup.sql'
  constructor(database: Database) {
    this.database = database
  }

  async setup(): Promise<void> {
    if (env.DATABASE_SCHEMA === 'test') {
      const file = await readFile(this.setupQueryDirectory, 'utf-8')
      await this.database.many(file, [])
    }
  }
}
