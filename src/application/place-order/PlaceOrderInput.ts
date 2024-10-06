export default class PlaceOrderInput {
  cpf: string
  zipcode: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any
  coupon: string | undefined
  issueDate: Date

  constructor({
    cpf,
    zipcode,
    items,
    coupon,
    issueDate = new Date(),
  }: {
    cpf: string
    zipcode: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any
    coupon?: string | undefined
    issueDate?: Date
  }) {
    this.cpf = cpf
    this.zipcode = zipcode
    this.items = items
    this.coupon = coupon
    this.issueDate = issueDate
  }
}
