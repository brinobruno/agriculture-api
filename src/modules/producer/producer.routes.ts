import { FastifyInstance } from 'fastify'

import { producerController } from './producer.controller'

export async function producerRoutes(app: FastifyInstance) {
  app.get('/', producerController.getAll)
  app.get('/:id', producerController.getById)
  app.post('/', producerController.create)
  app.put('/:id', producerController.updateById)
  app.delete('/:id', producerController.deleteById)
}
