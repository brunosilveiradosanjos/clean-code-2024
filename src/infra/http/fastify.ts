import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
export const app: FastifyInstance = fastify()

app.get('/orders/:code', (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({
    code: '202400000001',
  })
})
app.listen({ port: 3000 })
