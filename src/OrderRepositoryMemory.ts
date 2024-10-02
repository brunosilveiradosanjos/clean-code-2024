import Order from './Order'
import OrderRepository from './OrderRepository'

export default class OrderRepositoryMemory implements OrderRepository {
  private orders: Array<Order>

  constructor() {
    this.orders = []
  }

  save(order: Order) {
    this.orders.push(order)
  }
}
