import { faker } from '@faker-js/faker'
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
  producerDataBody: Partial<Producer> | createProducerServiceParams,
) => {
  let producerCrops: ProducerCrop[] = []

  if (producerDataBody.producerCrops) {
    producerCrops = producerDataBody.producerCrops.map(
      (crop) => new ProducerCrop({ ...crop, id: faker.string.uuid() }),
    )
  } else return

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
