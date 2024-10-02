import Item from '@/domain/entity/Item'

export default class FreightCalculator {
  static calculate(distance: number, item: Item) {
    const price = distance * item.getVolume() * (item.getDensity() / 100)
    return price < 10 ? 10 : price
  }
}
