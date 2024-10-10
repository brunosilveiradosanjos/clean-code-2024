import GetOrder from '@/application/get-order/GetOrder'
import Http from './Http'
import RepositoryFactory from '@/domain/factory/RepositoryFactory'
import ZipcodeCalculatorAPIMemory from '../gateway/memory/ZipcodeCalculatorAPIMemory'
import PlaceOrder from '@/application/place-order/PlaceOrder'
import GetItems from '@/application/get-item/GetItems'

export default class RoutesConfig {
  private http: Http
  private repositoryFactory: RepositoryFactory

  constructor(http: Http, repositoryFactory: RepositoryFactory) {
    this.http = http
    this.repositoryFactory = repositoryFactory
  }

  build() {
    // eslint-disable-next-line no-template-curly-in-string, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    this.http.on('get', '/orders/${code}', async (params: any, body: any) => {
      const getOrder = new GetOrder(this.repositoryFactory)
      const order = await getOrder.execute(params.code)
      return order
    })

    // eslint-disable-next-line no-template-curly-in-string, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    this.http.on('get', '/items', async (params: any, body: any) => {
      const getItems = new GetItems(this.repositoryFactory)
      const orders = await getItems.execute()
      return orders
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.http.on('post', '/orders', async (params: any, body: any) => {
      const placeOrder = new PlaceOrder(
        this.repositoryFactory,
        new ZipcodeCalculatorAPIMemory(),
      )
      const order = await placeOrder.execute(body)
      return order
    })
  }
}
