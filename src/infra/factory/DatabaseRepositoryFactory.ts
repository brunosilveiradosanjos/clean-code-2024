import RepositoryFactory from '@/domain/factory/RepositoryFactory'
import PgPromiseDatabase from '@/infra/database/PgPromiseDatabase'
import ItemRepository from '@/domain/repository/ItemRepository'
import ItemRepositoryDatabase from '@/infra/repository/database/ItemRepositoryDatabase'
import OrderRepository from '@/domain/repository/OrderRepository'
import OrderRepositoryDatabase from '@/infra/repository/database/OrderRepositoryDatabase'
import CouponRepository from '@/domain/repository/CouponRepository'
import CouponRepositoryDatabase from '@/infra/repository/database/CouponRepositoryDatabase'
import TaxTableRepository from '@/domain/repository/TaxTableRepository'
import TaxTableRepositoryDatabase from '@/infra/repository/database/TaxTableRepositoryDatabase'
import StockEntryRepository from '@/domain/repository/StockEntryRepository'
import StockEntryRepositoryDatabase from '@/infra/repository/database/StockEntryRepositoryDatabase'
import SetupTestRepository from '@/domain/repository/SetupTestRepository'
import SetupTestRepositoryDatabase from '@/infra/repository/database/SetupTestRepositoryDatabase'

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  createItemRepository(): ItemRepository {
    return new ItemRepositoryDatabase(PgPromiseDatabase.getInstance())
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(PgPromiseDatabase.getInstance())
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(PgPromiseDatabase.getInstance())
  }

  createTaxTableRepository(): TaxTableRepository {
    return new TaxTableRepositoryDatabase(PgPromiseDatabase.getInstance())
  }

  createStockEntryRepository(): StockEntryRepository {
    return new StockEntryRepositoryDatabase(PgPromiseDatabase.getInstance())
  }

  createSetupTestRepository(): SetupTestRepository {
    return new SetupTestRepositoryDatabase(PgPromiseDatabase.getInstance())
  }
}
