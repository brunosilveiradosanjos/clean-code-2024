import Order from '@/domain/entity/Order'
import OrderRepository from '@/domain/repository/OrderRepository'

export default class OrderRepositoryMemory implements OrderRepository {
  private orders: Array<Order>

  constructor() {
    this.orders = []
  }

  save(order: Order) {
    this.orders.push(order)
  }
}
