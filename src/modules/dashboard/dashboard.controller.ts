import { FastifyReply, FastifyRequest } from 'fastify'
import { dashboardService } from './dashboard.services'

export const dashboardController = {
  getFarmsTotalQuantity: async (
    _request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const totalQuantity = await dashboardService.getFarmsTotalQuantity()
    reply.send({ totalQuantity })
  },

  getFarmsTotalHectares: async (
    _request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const totalHectares = await dashboardService.getFarmsTotalHectares()
    reply.send({ totalHectares })
  },

  getFarmsByState: async (_request: FastifyRequest, reply: FastifyReply) => {
    const farmsByState = await dashboardService.getFarmsByState()
    reply.send({ farmsByState })
  },

  getFarmsByCulture: async (_request: FastifyRequest, reply: FastifyReply) => {
    const farmsByCulture = await dashboardService.getFarmsByCulture()
    reply.send({ farmsByCulture })
  },

  getSoilUsageRatio: async (_request: FastifyRequest, reply: FastifyReply) => {
    const soilUsageRatio = await dashboardService.getSoilUsageRatio()
    reply.send({ soilUsageRatio })
  },
}
