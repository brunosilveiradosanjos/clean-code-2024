// Adapter
import pgp from 'pg-promise'
import Database from './Database'
export default class PgPromiseDatabase implements Database {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pgp: any
  constructor() {
    this.pgp = pgp()('postgres://postgres:123456@localhost:5432/app')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  many(query: string, parameters: any) {
    return this.pgp.query(query, parameters)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  one(query: string, parameters: any) {
    return this.pgp.oneOrNone(query, parameters)
  }
}
