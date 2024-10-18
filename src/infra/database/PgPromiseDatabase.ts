import pgp from 'pg-promise'
import Database from '../database/Database'
import { env } from '@/infra/env/environment'

export default class PgPromiseDatabase implements Database {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private pgp: any
  // eslint-disable-next-line no-use-before-define
  static instance: PgPromiseDatabase

  private constructor() {
    this.pgp = pgp()(env.DATABASE_URL)
  }

  static getInstance() {
    if (!PgPromiseDatabase.instance) {
      PgPromiseDatabase.instance = new PgPromiseDatabase()
    }
    return PgPromiseDatabase.instance
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  many(query: string, parameters: any) {
    return this.pgp.query(query, parameters)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  one(query: string, parameters: any) {
    return this.pgp.oneOrNone(query, parameters)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  none(query: string, parameters: any): void {
    return this.pgp.none(query, parameters)
  }
}
