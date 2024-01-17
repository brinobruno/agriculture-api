import { FastifyReply, FastifyRequest } from 'fastify'

import connectDB from '../config/ormconfig'
import { Producer } from '../Entities/Producer'

export async function getProducers(
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

export async function addProducer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id, cpfOrCnpj } = request.body
  try {
    const producerRepository = connectDB.getRepository(Producer)

    const newProducer = producerRepository.create({
      id,
      cpfOrCnpj,
    })

    await producerRepository.save(newProducer)

    return reply.status(201).send({
      message: 'Producer added successfully',
    })
  } catch (error) {
    console.error(`Error adding producer:`, error)
    return reply.status(500).send({ error: `Something went wrong: ${error}` })
  }
}
