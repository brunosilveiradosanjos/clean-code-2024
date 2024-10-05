import GetOrder from '@/application/GetOrder'
import Http from './Http'
import RepositoryFactory from '@/domain/factory/RepositoryFactory'

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
  }
}
