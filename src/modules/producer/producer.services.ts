import { v4 } from 'uuid'

import { Producer } from '../../Entities/Producer'
import { ProducerCrop } from '../../Entities/ProducerCrop'
import {
  findAllProducers,
  findOneProducer,
  updateProducer,
  // saveProducer,
} from './producer.repository'
import {
  validateProducerCrops,
  validateUsedLand,
} from '../../shared/validateLand'

type createOrUpdateProducerType = {
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
  producerBodyData: createOrUpdateProducerType,
) => {
  let producerCrops: ProducerCrop[] = []

  const { cultivableAreaHectares, vegetationAreaHectares, totalAreaHectares } =
    producerBodyData

  validateUsedLand({
    cultivableArea: cultivableAreaHectares,
    vegetationArea: vegetationAreaHectares,
    totalArea: totalAreaHectares,
  })

  validateProducerCrops({ producerCrops: producerBodyData.producerCrops })

  producerCrops = producerBodyData.producerCrops.map(
    (crop) => new ProducerCrop({ ...crop, id: v4() }),
  )

  const producer = new Producer({
    ...producerBodyData,
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

export const updateProducerById = async (
  id: string,
  producerBodyData: createOrUpdateProducerType,
) => {
  let producerCrops: ProducerCrop[] = []

  const { cultivableAreaHectares, vegetationAreaHectares, totalAreaHectares } =
    producerBodyData

  validateUsedLand({
    cultivableArea: cultivableAreaHectares,
    vegetationArea: vegetationAreaHectares,
    totalArea: totalAreaHectares,
  })

  validateProducerCrops({ producerCrops: producerBodyData.producerCrops })

  const existingProducer = await findOneProducer(id)
  if (!existingProducer) throw new Error('Producer not found')

  producerCrops = producerBodyData.producerCrops.map(
    (crop) => new ProducerCrop({ ...crop, id }),
  )

  const updatedProducer = await updateProducer(id, {
    ...existingProducer,
    ...producerBodyData,
    producerCrops,
  })

  return updatedProducer
}
