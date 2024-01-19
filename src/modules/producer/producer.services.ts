import { Producer } from '../../Entities/Producer'
import { ProducerCrop } from '../../Entities/ProducerCrop'
import { findAllProducers, findOneProducer } from './producer.repository'

type createProducerServiceParams = {
  id: string
  cpfCnpj: string
  name: string
  farmName: string
  city: string
  state: string
  totalAreaHectares: number
  cultivableAreaHectares: number
  vegetationAreaHectares: number
  producerCrops: { id: string; cropName: string }[]
}

export const createProducer = async (
  producerDataBody: Partial<Producer> | createProducerServiceParams,
) => {
  if (!producerDataBody.producerCrops) return

  const producer = new Producer({
    ...producerDataBody,
    producerCrops: producerDataBody.producerCrops.map(
      (crop) => new ProducerCrop(crop),
    ),
  })

  // const createdProducer = await saveProducer(producer)

  return producer
}

export const getAllProducers = async () => {
  return await findAllProducers()
}

export const getProducerById = async (id: string) => {
  return await findOneProducer(id)
}
