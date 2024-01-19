// import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import { faker } from '@faker-js/faker'

import { app } from './../../app'
import { generateCrop, generateProducer } from '../../scripts/generateMockData'
import { Producer } from '../../Entities/Producer'
import { ProducerCrop } from '../../Entities/ProducerCrop'

describe('Producer Entity', () => {
  /* Make sure app (and thefore its routes) are done loading before testing */
  beforeAll(async () => await app.ready())

  afterAll(async () => await app.close())

  it('should create a producer', async () => {
    // Arrange
    const producerMockData = generateProducer()
    const producerCropMockData = Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      generateCrop,
    )

    // Act
    const producerCropInstance = producerCropMockData.map(
      (crop) => new ProducerCrop(crop),
    )
    const producerInstance = new Producer({
      ...producerMockData,
      producerCrops: producerCropInstance,
    })
    console.log(producerInstance)

    // Assert
    expect(producerInstance).toBeDefined()
  })
})
