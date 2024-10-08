import RepositoryFactory from '@/domain/factory/RepositoryFactory'
import ItemRepository from '@/domain/repository/ItemRepository'
import CouponRepository from '@/domain/repository/CouponRepository'
import OrderRepository from '@/domain/repository/OrderRepository'
import ItemRepositoryMemory from '@/infra/repository/memory/ItemRepositoryMemory'
import CouponRepositoryMemory from '@/infra/repository/memory/CouponRepositoryMemory'
import OrderRepositoryMemory from '@/infra/repository/memory/OrderRepositoryMemory'
import TaxTableRepository from '@/domain/repository/TaxTableRepository'
import TaxTableRepositoryMemory from '@/infra/repository/memory/TaxTableRepositoryMemory'

export default class MemoryRepositoryFactory implements RepositoryFactory {
  createTaxTableRepository(): TaxTableRepository {
    return new TaxTableRepositoryMemory()
  }

  createItemRepository(): ItemRepository {
    return new ItemRepositoryMemory()
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryMemory()
  }

  createOrderRepository(): OrderRepository {
    return OrderRepositoryMemory.getInstance()
  }
}
