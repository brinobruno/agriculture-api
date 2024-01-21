import { FastifyReply, FastifyRequest } from 'fastify'
import { dashboardService } from './dashboard.services'

export const dashboardController = {
  getFarmsTotalQuantity: async (
    _request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    try {
      const totalQuantity = await dashboardService.getFarmsTotalQuantity()
      reply.status(200).send({ totalQuantity })
    } catch (error) {
      reply
        .status(500)
        .send({ error: `Error retrieving total quantity: ${error}` })
    }
  },

  getFarmsTotalHectares: async (
    _request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    try {
      const totalHectares = await dashboardService.getFarmsTotalHectares()
      reply.status(200).send({ totalHectares })
    } catch (error) {
      reply
        .status(500)
        .send({ error: `Error retrieving total hectares: ${error}` })
    }
  },

  getFarmsByState: async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const farmsByState = await dashboardService.getFarmsByState()
      reply.status(200).send({ farmsByState })
    } catch (error) {
      reply
        .status(500)
        .send({ error: `Error retrieving farms by state: ${error}` })
    }
  },

  getFarmsByCrop: async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const farmsByCrop = await dashboardService.getFarmsByCrop()
      reply.status(200).send({ farmsByCrop })
    } catch (error) {
      reply
        .status(500)
        .send({ error: `Error retrieving farms by crop: ${error}` })
    }
  },

  getLandUsageRatio: async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const landUsageRatio = await dashboardService.getLandUsageRatio()
      reply.status(200).send({ landUsageRatio })
    } catch (error) {
      reply.status(500).send({ error: `Error retrieving land usage: ${error}` })
    }
  },
}
