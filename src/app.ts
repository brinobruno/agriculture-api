import fastify from 'fastify'
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

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

app.register(fastifySwagger, {
  mode: 'static',
  specification: { path: './swagger.yaml', baseDir: './swagger.yaml' },
})
app.register(fastifySwaggerUI, {
  routePrefix: 'api/v1/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
})
