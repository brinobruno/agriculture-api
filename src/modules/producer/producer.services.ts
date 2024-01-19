import { v4 } from 'uuid'

import { Producer } from '../../Entities/Producer'
import { ProducerCrop } from '../../Entities/ProducerCrop'
import {
  findAllProducers,
  findOneProducer,
  // saveProducer,
} from './producer.repository'
import {
  validateProducerCrops,
  validateUsedLand,
} from '../../shared/validateLand'

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

  validateUsedLand({
    cultivableArea: cultivableAreaHectares,
    vegetationArea: vegetationAreaHectares,
    totalArea: totalAreaHectares,
  })

  validateProducerCrops({ producerCrops: producerDataBody.producerCrops })

  producerCrops = producerDataBody.producerCrops.map(
    (crop) => new ProducerCrop({ ...crop, id: v4() }),
  )

  const producer = new Producer({
    ...producerDataBody,
    producerCrops,
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
