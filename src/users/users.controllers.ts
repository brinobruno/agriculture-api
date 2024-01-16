import { FastifyReply, FastifyRequest } from 'fastify'

export async function getUsers(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    return await reply.status(201).send({
      message: 'Hey users',
    })
  } catch (error) {
    return reply.status(403).send({ error: `Something went wrong: ${error}` })
  }
}