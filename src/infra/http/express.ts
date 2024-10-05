import express, { Request, Response } from 'express'
import GetOrder from '@/application/GetOrder'
import DatabaseRepositoryFactory from '@/infra/factory/DatabaseRepositoryFactory'

export const app = express()

app.get('/orders/:code', async (request: Request, response: Response) => {
  const getOrder = new GetOrder(new DatabaseRepositoryFactory())
  const order = await getOrder.execute(request.params.code)
  response.json(order)
})
app.listen(3000)
