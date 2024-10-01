import Coupon from './Coupon'
import Cpf from './Cpf'
import OrderItem from './OrderItem'

export default class Order {
  public cpf: Cpf
  public coupon: Coupon | undefined
  public items: Array<OrderItem> = []

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf)
  }

  addItem({ description, price, quantity }: OrderItem): void {
    this.items.push(new OrderItem(description, price, quantity))
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired()) {
      this.coupon = coupon
    }
  }

  getTotal(): number {
    let total = this.items
      .map((item) => item.getTotal())
      .reduce((previous, current) => previous + current)
    if (this.coupon) {
      total = total - (total * this.coupon.discountPercentage) / 100
    }
    return total
  }
}
