import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import Http from './Http'

export default class FastifyHttp implements Http {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public app: FastifyInstance | any

  constructor() {
    this.app = fastify()
  }

  private convertUrl(url: string) {
    return url.replace(/\$\{/g, ':').replace(/\}/g, '')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async on(method: string, url: string, fn: any): Promise<void> {
    this.app[method](
      this.convertUrl(url),
      async (request: FastifyRequest, response: FastifyReply) => {
        const data = await fn(request.params, request.body)
        response.send(data)
      },
    )
  }

  async listen(port: number): Promise<void> {
    this.app.listen({ port })
  }
}
