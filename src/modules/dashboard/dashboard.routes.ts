import { FastifyInstance } from 'fastify'
import { dashboardController } from './dashboard.controller'

export async function dashboardRoutes(app: FastifyInstance) {
  // app.get ALL data route later
  app.get('/', dashboardController.getFullData)
  app.get('/total-quantity', dashboardController.getFarmsTotalQuantity)
  app.get('/total-hectares', dashboardController.getFarmsTotalHectares)
  app.get('/farms-by-state', dashboardController.getFarmsByState)
  app.get('/farms-by-crop', dashboardController.getFarmsByCrop)
  app.get('/land-usage-ratio', dashboardController.getLandUsageRatio)
}
