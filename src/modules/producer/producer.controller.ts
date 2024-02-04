import { FastifyReply, FastifyRequest } from 'fastify'
import { v4 } from 'uuid'

import { createAndUpdateProducerSchema } from './producer.schema'
import { producerService } from './producer.services'
import { setIdParamsSchema } from '../../shared/schemas'

export const producerController = {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const id = v4()
    const producerDataBody = createAndUpdateProducerSchema.parse(request.body)

    try {
      const producer = await producerService.createProducer({
        ...producerDataBody,
        id,
      })

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
      const producers = await producerService.getAllProducers()

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
      const producer = await producerService.getProducerById(id)

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

  async updateById(request: FastifyRequest, reply: FastifyReply) {
    const getProducerParamsSchema = setIdParamsSchema()
    const { id } = getProducerParamsSchema.parse(request.params)

    const producerDataBody = createAndUpdateProducerSchema.parse(request.body)

    try {
      const producer = await producerService.updateProducerById(id, {
        ...producerDataBody,
        id,
      })

      return reply.status(200).send({
        message: 'producer updated successfully.',
        producer,
      })
    } catch (error) {
      return reply
        .status(500)
        .send({ error: `Error updating producer: ${error}` })
    }
  },

  async deleteById(request: FastifyRequest, reply: FastifyReply) {
    const getProducerParamsSchema = setIdParamsSchema()
    const { id } = getProducerParamsSchema.parse(request.params)

    try {
      await producerService.deleteProducerById(id)
      return reply.status(204).send()
    } catch (error) {
      console.error('Error deleting producer:', error)
      return reply.status(500).send({ error: 'Error deleting producer' })
    }
  },
}
