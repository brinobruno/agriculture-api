import { FastifyInstance } from 'fastify'

import { addProducer, getProducers } from './producers.controllers'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', getProducers)

  app.post('/', addProducer)
}
