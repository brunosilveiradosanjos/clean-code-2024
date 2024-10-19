import CouponRepository from '@/domain/repository/CouponRepository'
import ItemRepository from '@/domain/repository/ItemRepository'
import OrderRepository from '@/domain/repository/OrderRepository'
import TaxTableRepository from '@/domain/repository/TaxTableRepository'
import StockEntryRepository from '@/domain/repository/StockEntryRepository'
import SetupTestRepository from '@/domain/repository/SetupTestRepository'

export default interface RepositoryFactory {
  createItemRepository(): ItemRepository
  createCouponRepository(): CouponRepository
  createOrderRepository(): OrderRepository
  createTaxTableRepository(): TaxTableRepository
  createStockEntryRepository(): StockEntryRepository
  createStockEntryRepository(): StockEntryRepository
  createSetupTestRepository(): SetupTestRepository
}
