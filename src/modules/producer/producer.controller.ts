import { FastifyReply, FastifyRequest } from 'fastify'

import { Producer } from '../../Entities/Producer'
import { createProducerSchema } from './producer.schema'
import { ProducerCrop } from '../../Entities/ProducerCrop'
import { findAllProducers } from './producer.repository'

export const producerController = {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const producerDataBody = createProducerSchema.parse(request.body)

    try {
      const producer = new Producer({
        ...producerDataBody,
        producerCrops: producerDataBody.producerCrops.map(
          (crop) => new ProducerCrop(crop),
        ),
      })

      // const createdProducer = await saveProducer(producer)

      return reply.status(201).send({
        message: 'Producer created successfully',
        producer,
        // createdProducer,
      })
    } catch (error) {
      console.error('Error creating producer:', error)

      return reply
        .status(500)
        .send({ error: `Internal Server Error: ${error}` })
    }

    // const producerRepository = connectDB.getRepository(Producer)
    // const newProducer = producerRepository.create({})
    // await producerRepository.save(newProducer)
  },

  async getAll(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const producers = findAllProducers()

      return await reply.status(200).send({
        message: `${(await producers).length} producers found.`,
        producers,
      })
    } catch (error) {
      return reply.status(403).send({ error: `Something went wrong: ${error}` })
    }
  },

  async getById(_request: FastifyRequest, _reply: FastifyReply) {
    //
  },

  async updateById(_request: FastifyRequest, _reply: FastifyReply) {
    //
  },

  async deleteById(_request: FastifyRequest, _reply: FastifyReply) {
    //
  },
}
