// import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'

import { generateCrop, generateProducer } from '../../scripts/generateMockData'

import { app } from './../../app'
import { Producer } from '../../Entities/Producer'
import { ProducerCrop } from '../../Entities/ProducerCrop'

describe('Producer Entity', () => {
  /* Make sure app (and thefore its routes) are done loading before testing */
  beforeAll(async () => await app.ready())

  afterAll(async () => await app.close())

  it('should create a producer', async () => {
    // Arrange
    const producerMockData = generateProducer()
    const producerCropMockData = generateCrop()

    // Act
    const producerCropInstance = new ProducerCrop(producerCropMockData)
    const producerInstance = new Producer({
      ...producerMockData,
      producerCrops: [producerCropInstance],
    })
    console.log(producerInstance)

    // Assert
    expect(producerInstance).toBeDefined()
  })
})
