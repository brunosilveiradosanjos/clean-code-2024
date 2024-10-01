import Coupon from './coupon'
import Order from './order'
import OrderItem from './orderItem'

export default class PlaceOrder {
  public orders: Array<Order>
  public coupons: Array<Coupon>

  constructor() {
    this.coupons = [new Coupon('10OFF', 10)]
    this.orders = []
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute(input: any) {
    const order = new Order(input.cpf)
    input.items.map((item: OrderItem) => order.addItem(item))
    if (input.coupon) {
      const coupon = this.coupons.find(
        (coupon) => coupon.description === input.coupon,
      )
      if (coupon) order.addCoupon(coupon)
    }
    const total = order.getTotal()
    this.orders.push(order)
    return { total }
  }
}
