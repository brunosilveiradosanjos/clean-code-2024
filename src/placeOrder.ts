import Coupon from './Coupon'
import Order from './Order'
import OrderItem from './OrderItem'
import PlaceOrderInput from './PlaceOrderInput'
import PlaceOrderOutput from './PlaceOrderOutput'

export default class PlaceOrder {
  public orders: Array<Order>
  public coupons: Array<Coupon>

  constructor() {
    this.coupons = [
      new Coupon('10OFF', 10, new Date('2041-01-01')),
      new Coupon('20OFF', 20, new Date('2001-01-01')),
    ]
    this.orders = []
  }

  execute(input: PlaceOrderInput): PlaceOrderOutput {
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
