import TaxTable from '@/domain/entity/TaxTable'
import TaxTableRepository from '@/domain/repository/TaxTableRepository'
import Database from '@/infra/database/Database'
import { env } from '@/infra/env/environment'

export default class TaxTableRepositoryDatabase implements TaxTableRepository {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  async getByIdItem(idItem: number): Promise<TaxTable[]> {
    const taxTablesData = await this.database.many(
      `select * from ${env.DATABASE_SCHEMA}.tax_table where id_item = $1`,
      [idItem],
    )
    const taxTables = []
    for (const taxTableData of taxTablesData) {
      taxTables.push(
        new TaxTable(
          taxTableData.id_item,
          taxTableData.type,
          parseFloat(taxTableData.value),
        ),
      )
    }
    return taxTables
  }
}
