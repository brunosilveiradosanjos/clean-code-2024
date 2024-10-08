import ZipcodeCalculatorAPIMemory from '@/infra/gateway/memory/ZipcodeCalculatorAPIMemory'
import Order from '@/domain/entity/Order'
import ItemRepository from '@/domain/repository/ItemRepository'
import CouponRepository from '@/domain/repository/CouponRepository'
import OrderRepository from '@/domain/repository/OrderRepository'
import TaxTableRepository from '@/domain/repository/TaxTableRepository'
import RepositoryFactory from '@/domain/factory/RepositoryFactory'
import ZipcodeCalculatorAPI from '@/domain/gateway/ZipcodeCalculatorAPI'
import TaxCalculatorFactory from '@/domain/factory/TaxCalculatorFactory'
import PlaceOrderInput from '@/application/place-order/PlaceOrderInput'
import FreightCalculator from './FreightCalculator'
import StockEntryRepository from '@/domain/repository/StockEntryRepository'
import StockEntry from '@/domain/entity/StockEntry'
import StockCalculator from './StockCalculator'

export default class OrderCreator {
  zipcodeCalculator: ZipcodeCalculatorAPIMemory
  itemRepository: ItemRepository
  couponRepository: CouponRepository
  orderRepository: OrderRepository
  taxTableRepository: TaxTableRepository
  stockEntryRepository: StockEntryRepository

  constructor(
    repositoryFactory: RepositoryFactory,
    zipcodeCalculator: ZipcodeCalculatorAPI,
  ) {
    this.itemRepository = repositoryFactory.createItemRepository()
    this.couponRepository = repositoryFactory.createCouponRepository()
    this.orderRepository = repositoryFactory.createOrderRepository()
    this.taxTableRepository = repositoryFactory.createTaxTableRepository()
    this.stockEntryRepository = repositoryFactory.createStockEntryRepository()
    this.zipcodeCalculator = zipcodeCalculator
  }

  // unit of work
  // events
  // SAGA
  async create(input: PlaceOrderInput) {
    const sequence = (await this.orderRepository.count()) + 1
    const order = new Order(input.cpf, input.issueDate, sequence)
    const distance = this.zipcodeCalculator.calculate(
      input.zipcode,
      '99.999-99',
    )
    const taxCalculator = TaxCalculatorFactory.create(input.issueDate)
    const stockCalculator = new StockCalculator()
    for (const orderItem of input.items) {
      const item = await this.itemRepository.getById(orderItem.idItem)
      if (!item) throw new Error('Item not found')
      order.addItem(orderItem.idItem, item.price, orderItem.quantity)
      order.freight +=
        FreightCalculator.calculate(distance, item) * orderItem.quantity
      const taxTables = await this.taxTableRepository.getByIdItem(item.id)
      const taxes = taxCalculator.calculate(item, taxTables)
      order.taxes += taxes * orderItem.quantity
      const stockEntries = await this.stockEntryRepository.getByIdItem(item.id)
      const quantity = stockCalculator.calculate(stockEntries)
      if (quantity < orderItem.quantity) throw new Error('Out of stock')
      this.stockEntryRepository.save(
        new StockEntry(item.id, 'out', orderItem.quantity, new Date()),
      )
      // EventPublisher.publish(new OrderCreated(infos order))
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.getByCode(input.coupon)
      if (coupon) order.addCoupon(coupon)
    }
    await this.orderRepository.save(order)
    return order
  }
}
