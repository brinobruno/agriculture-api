import { FastifyReply, FastifyRequest } from 'fastify'

import { createProducerSchema } from './producer.schema'
import {
  createProducer,
  getAllProducers,
  getProducerById,
} from './producer.services'
import { setIdParamsSchema } from '../../shared/schemas'

export const producerController = {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const producerDataBody = createProducerSchema.parse(request.body)

    try {
      const producer = await createProducer(producerDataBody)

      return reply.status(201).send({
        message: 'Producer created successfully',
        producer,
      })
    } catch (error) {
      return reply
        .status(500)
        .send({ error: `Error creating a producer: ${error}` })
    }
  },

  async getAll(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const producers = await getAllProducers()

      return reply.status(200).send({
        message: `${producers.length} producers found.`,
        numberOfProducers: producers.length,
        producers,
      })
    } catch (error) {
      return reply
        .status(500)
        .send({ error: `Error getting producers: ${error}` })
    }
  },

  async getById(request: FastifyRequest, reply: FastifyReply) {
    const getProducerParamsSchema = setIdParamsSchema()
    const { id } = getProducerParamsSchema.parse(request.params)

    try {
      const producer = await getProducerById(id)

      return reply.status(200).send({
        message: 'producer found.',
        producer,
      })
    } catch (error) {
      return reply
        .status(500)
        .send({ error: `Error getting producer: ${error}` })
    }
  },

  async updateById(_request: FastifyRequest, _reply: FastifyReply) {
    //
  },

  async deleteById(_request: FastifyRequest, _reply: FastifyReply) {
    //
  },
}
