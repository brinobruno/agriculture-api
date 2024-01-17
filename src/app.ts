import fastify from 'fastify'
import cors from '@fastify/cors'

import { usersRoutes } from './modules/producers/producers.routes'

export const app = fastify()

app.register(cors, {
  origin: 'http://localhost:3000',
})

app.register(usersRoutes, {
  prefix: 'api/v1/users',
})
