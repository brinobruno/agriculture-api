import { FastifyInstance } from 'fastify'

import { getUsers } from './users.controllers'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', getUsers)
}