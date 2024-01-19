import { v4 } from 'uuid'

import { Producer } from '../../Entities/Producer'
import { ProducerCrop } from '../../Entities/ProducerCrop'
import {
  findAllProducers,
  findOneProducer,
  saveProducer,
} from './producer.repository'

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
  producerCrops: { cropName: string; areaHectares: number }[]
}

export const createProducer = async (
  producerDataBody: createProducerServiceParams,
) => {
  let producerCrops: ProducerCrop[] = []

  const { cultivableAreaHectares, vegetationAreaHectares, totalAreaHectares } =
    producerDataBody
  const usedLandAreaHectares = cultivableAreaHectares + vegetationAreaHectares

  if (usedLandAreaHectares > totalAreaHectares)
    throw new Error('Used land area cannot be bigger than total area')
  if (!producerDataBody.producerCrops)
    throw new Error('Producer must provide crops')

  producerCrops = producerDataBody.producerCrops.map(
    (crop) => new ProducerCrop({ ...crop, id: v4() }),
  )

  const producer = new Producer({
    ...producerDataBody,
    producerCrops,
  })

  console.log(producer)

  const createdProducer = await saveProducer(producer)

  return createdProducer
}

export const getAllProducers = async () => {
  return await findAllProducers()
}

export const getProducerById = async (id: string) => {
  return await findOneProducer(id)
}
