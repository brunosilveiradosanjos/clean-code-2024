import Http from './Http'
import express from 'express'

export default class ExpressHttp implements Http {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public app: any

  constructor() {
    this.app = express()
    this.app.use(express.json())
  }

  private convertUrl(url: string) {
    return url.replace(/\$\{/g, ':').replace(/\}/g, '')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async on(method: string, url: string, fn: any): Promise<void> {
    this.app[method](
      this.convertUrl(url),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (request: any, response: any) => {
        const data = await fn(request.params, request.body)
        response.json(data)
      },
    )
  }

  async listen(port: number): Promise<void> {
    this.app.listen(port)
  }
}
