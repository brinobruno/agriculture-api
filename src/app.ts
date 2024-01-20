import fastify from 'fastify'
import cors from '@fastify/cors'

import { producerRoutes } from './modules/producer/producer.routes'
import { dashboardRoutes } from './modules/dashboard/dashboard.routes'

export const app = fastify()

app.register(cors, {
  origin: 'http://localhost:3000',
})

app.register(producerRoutes, {
  prefix: 'api/v1/producers',
})

app.register(dashboardRoutes, {
  prefix: 'api/v1/dashboard',
})
