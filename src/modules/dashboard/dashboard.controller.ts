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

  getFarmsByCrop: async (_request: FastifyRequest, reply: FastifyReply) => {
    const farmsByCrop = await dashboardService.getFarmsByCrop()
    reply.send({ farmsByCrop })
  },

  getLandUsageRatio: async (_request: FastifyRequest, reply: FastifyReply) => {
    const landUsageRatio = await dashboardService.getLandUsageRatio()
    reply.send({ landUsageRatio })
  },
}
