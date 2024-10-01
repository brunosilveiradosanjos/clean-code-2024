export default class PlaceOrderInput {
  cpf: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any
  coupon: string
  constructor({
    cpf,
    items,
    coupon,
  }: {
    cpf: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any
    coupon: string
  }) {
    this.cpf = cpf
    this.items = items
    this.coupon = coupon
  }
}
