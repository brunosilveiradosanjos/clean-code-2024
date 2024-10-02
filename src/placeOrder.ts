import Coupon from './Coupon'
import FreightCalculator from './FreightCalculator'
import Item from './Item'
import Order from './Order'
import OrderItem from './OrderItem'
import PlaceOrderInput from './PlaceOrderInput'
import PlaceOrderOutput from './PlaceOrderOutput'
import ZipcodeCalculatorAPIMemory from './ZipcodeCalculatorAPIMemory'

export default class PlaceOrder {
  public orders: Array<Order>
  public coupons: Array<Coupon>
  public items: Array<Item>
  public zipcodeCalculator: ZipcodeCalculatorAPIMemory

  constructor() {
    this.coupons = [
      new Coupon('10OFF', 10, new Date('2041-01-01')),
      new Coupon('20OFF', 20, new Date('2001-01-01')),
    ]
    this.orders = []
    this.items = [
      new Item('1', 'Guitar', 10000, 100, 50, 15, 3),
      new Item('2', 'Amplifier', 5000, 50, 50, 50, 22),
      new Item('3', 'Cable', 50, 30, 10, 10, 1),
    ]
    this.zipcodeCalculator = new ZipcodeCalculatorAPIMemory()
  }

  execute(input: PlaceOrderInput): PlaceOrderOutput {
    const order = new Order(input.cpf)
    const distance = this.zipcodeCalculator.calculate(
      input.zipcode,
      '99.999-99',
    )
    input.items.map((orderItem: OrderItem) => {
      const item = this.items.find((item) => item.id === orderItem.id)
      if (!item) throw new Error('Item not found')
      order.addItem(orderItem.id, orderItem.price, orderItem.quantity)
      order.freight +=
        FreightCalculator.calculate(distance, item) * orderItem.quantity
      return order
    })
    if (input.coupon) {
      const coupon = this.coupons.find(
        (coupon) => coupon.description === input.coupon,
      )
      if (coupon) order.addCoupon(coupon)
    }
    const total = order.getTotal()
    this.orders.push(order)
    return new PlaceOrderOutput({ freight: order.freight, total })
  }
}
