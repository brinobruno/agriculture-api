import { FastifyInstance } from 'fastify'
import { dashboardController } from './dashboard.controller'

export async function dashboardRoutes(app: FastifyInstance) {
  app.get('/', dashboardController.getFarmsTotalQuantity)
  app.get('/', dashboardController.getFarmsTotalHectares)
  app.get('/', dashboardController.getFarmsByState)
  app.get('/', dashboardController.getFarmsByCulture)
  app.get('/', dashboardController.getSoilUsageRatio)
}
