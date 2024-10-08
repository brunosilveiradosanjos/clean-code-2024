import RepositoryFactory from '@/domain/factory/RepositoryFactory'
import CouponRepository from '@/domain/repository/CouponRepository'
import ItemRepository from '@/domain/repository/ItemRepository'
import OrderRepository from '@/domain/repository/OrderRepository'
import PgPromiseDatabase from '@/infra/database/PgPromiseDatabase'
import TaxTableRepository from '@/domain/repository/TaxTableRepository'
import TaxTableRepositoryDatabase from '@/infra/repository/database/TaxTableRepositoryDatabase'
import ItemRepositoryDatabase from '@/infra/repository/database/ItemRepositoryDatabase'
import CouponRepositoryDatabase from '@/infra/repository/database/CouponRepositoryDatabase'
import OrderRepositoryDatabase from '@/infra/repository/database/OrderRepositoryDatabase'

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  createTaxTableRepository(): TaxTableRepository {
    return new TaxTableRepositoryDatabase(PgPromiseDatabase.getInstance())
  }

  createItemRepository(): ItemRepository {
    return new ItemRepositoryDatabase(PgPromiseDatabase.getInstance())
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(PgPromiseDatabase.getInstance())
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(PgPromiseDatabase.getInstance())
  }
}
