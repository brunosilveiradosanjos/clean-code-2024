import CouponRepository from '@/domain/repository/CouponRepository'
import ItemRepository from '@/domain/repository/ItemRepository'
import OrderRepository from '@/domain/repository/OrderRepository'

export default interface RepositoryFactory {
  createItemRepository(): ItemRepository
  createCouponRepository(): CouponRepository
  createOrderRepository(): OrderRepository
}
