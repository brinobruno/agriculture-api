import { FastifyReply, FastifyRequest } from 'fastify'

export const dashboardController = {
  async getFarmsTotalQuantity(_request: FastifyRequest, reply: FastifyReply) {},

  async getFarmsTotalHectares(_request: FastifyRequest, reply: FastifyReply) {},

  async getFarmsByState(_request: FastifyRequest, reply: FastifyReply) {},

  async getFarmsByCulture(_request: FastifyRequest, reply: FastifyReply) {},

  async getSoilUsageRatio(_request: FastifyRequest, reply: FastifyReply) {},
}
