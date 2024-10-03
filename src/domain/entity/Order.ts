import Coupon from './Coupon'
import Cpf from './Cpf'
import OrderCode from './OrderCode'
import OrderItem from './OrderItem'

export default class Order {
  public cpf: Cpf
  public coupon: Coupon | undefined
  public items: Array<OrderItem> = []
  public freight: number = 0
  public code: OrderCode
  public sequence: number
  public issueDate: Date

  constructor(cpf: string, issueDate: Date = new Date(), sequence: number = 1) {
    this.cpf = new Cpf(cpf)
    this.issueDate = issueDate
    this.sequence = sequence
    this.code = new OrderCode(issueDate, sequence)
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
    if (this.coupon) {
      total = total - (total * this.coupon.discountPercentage) / 100
    }
    total += this.freight
    return total
  }
}
