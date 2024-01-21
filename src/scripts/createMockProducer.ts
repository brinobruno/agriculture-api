import { faker } from '@faker-js/faker'
import { generateCrop, generateProducer } from './generateMockData'
import { Producer } from '../Entities/Producer'
import { ProducerCrop } from '../Entities/ProducerCrop'

export const createMockProducer = () => {
  const producerMockData = generateProducer()
  const producerCropMockData = Array.from(
    { length: faker.number.int({ min: 1, max: 5 }) },
    generateCrop,
  )

  const producerCropInstance = producerCropMockData.map(
    (crop) => new ProducerCrop(crop),
  )
  const producerInstance = new Producer({
    ...producerMockData,
    producerCrops: producerCropInstance,
  })

  return { producerMockData, producerInstance, producerCropInstance }
}
