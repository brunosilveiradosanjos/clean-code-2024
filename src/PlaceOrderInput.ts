export default class PlaceOrderInput {
  cpf: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any
  coupon: string
  zipcode: string
  constructor({
    cpf,
    items,
    coupon,
    zipcode,
  }: {
    cpf: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any
    coupon: string
    zipcode: string
  }) {
    this.cpf = cpf
    this.items = items
    this.coupon = coupon
    this.zipcode = zipcode
  }
}
