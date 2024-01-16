import fastify from 'fastify'
import cors from '@fastify/cors'

export const app = fastify()

app.register(cors, {
  origin: 'http://localhost:3000',
})

// app.register('middleware here', {
//   prefix: 'api/v1/path',
// })