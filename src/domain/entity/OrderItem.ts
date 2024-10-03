export default class OrderItem {
  public id: string
  public price: number
  public quantity: number

  constructor(id: string, price: number, quantity: number) {
    this.id = id
    this.price = price
    this.quantity = quantity
  }

  getTotal(): number {
    return (this.price as number) * (this.quantity as number)
  }
}
