import RepositoryFactory from '@/domain/factory/RepositoryFactory'
import CouponRepository from '@/domain/repository/CouponRepository'
import ItemRepository from '@/domain/repository/ItemRepository'
import OrderRepository from '@/domain/repository/OrderRepository'
import PgPromiseDatabase from '@/infra/database/PgPromiseDatabase'
import ItemRepositoryDatabase from '../repository/database/ItemRepositoryDatabase'
import CouponRepositoryDatabase from '../repository/database/CouponRepositoryDatabase'
import OrderRepositoryDatabase from '../repository/database/OrderRepositoryDatabase'

export default class DatabaseRepositoryFactory implements RepositoryFactory {
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
