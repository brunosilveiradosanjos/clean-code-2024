import Coupon from './Coupon'
import Cpf from './Cpf'
import OrderItem from './OrderItem'

export default class Order {
  private cpf: Cpf
  private coupon: Coupon | undefined
  private items: Array<OrderItem> = []
  public freight: number = 0

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf)
  }

  addItem(id: string, price: number, quantity: number): void {
    this.items.push(new OrderItem(id, price, quantity))
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired()) {
      this.coupon = coupon
    }
  }

  getTotal(): number {
    let total = 0
    for (const orderItem of this.items) {
      total += orderItem.getTotal()
    }
    // total = this.items
    //   .map((item) => item.getTotal())
    //   .reduce((previous, current) => previous + current)
    if (this.coupon) {
      total = total - (total * this.coupon.discountPercentage) / 100
    }
    total += this.freight
    return total
  }
}
