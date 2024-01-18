// import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'

import { generateProducer } from '../../scripts/generateMockData'

import { app } from './../../app'
import { Producer } from '../../Entities/Producer'

describe('Producer Entity', () => {
  /* Make sure app (and thefore its routes) are done loading before testing */
  beforeAll(async () => await app.ready())

  afterAll(async () => await app.close())

  it('should create a producer', async () => {
    // Arrange
    const {
      id,
      name,
      cpfCnpj,
      farmName,
      city,
      state,
      totalAreaHectares,
      cultivableAreaHectares,
      vegetationAreaHectares,
    } = generateProducer()

    // Act
    const producerInstance = new Producer({
      id,
      name,
      cpfCnpj,
      farmName,
      city,
      state,
      totalAreaHectares,
      cultivableAreaHectares,
      vegetationAreaHectares,
    })
    console.log(producerInstance)

    // Assert
    expect(producerInstance).toBeDefined()
  })
})
