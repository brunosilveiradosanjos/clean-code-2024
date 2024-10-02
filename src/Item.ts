export default class Item {
  public id: string
  public description: string
  public price: number
  public width: number
  public height: number
  public length: number
  public weigth: number
  constructor(
    id: string,
    description: string,
    price: number,
    width: number,
    height: number,
    length: number,
    weigth: number,
  ) {
    this.id = id
    this.description = description
    this.price = price
    this.width = width
    this.height = height
    this.length = length
    this.weigth = weigth
  }

  getVolume(): number {
    return (this.width / 100) * (this.height / 100) * (this.length / 100)
  }

  getDensity(): number {
    return this.weigth / this.getVolume()
  }
}
