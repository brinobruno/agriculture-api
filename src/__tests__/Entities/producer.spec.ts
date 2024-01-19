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

  it('should be able to create a producer', async () => {
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

  it('should create a producer crops', async () => {
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

    // Assert
    expect(producerInstance.producerCrops).toEqual(producerCropMockData)
  })

  it('should throw an error for invalid CPF/CNPJ', () => {
    // Arrange
    const producerMockData = generateProducer()
    const producerCropMockData = Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      generateCrop,
    )
    const invalidCpfCnpj = '123'

    // Act
    const producerCropInstance = producerCropMockData.map(
      (crop) => new ProducerCrop(crop),
    )

    const producerInstance = new Producer({
      ...producerMockData,
      producerCrops: producerCropInstance,
      cpfCnpj: invalidCpfCnpj,
    })

    // Assert
    expect(producerInstance).toThrowError()
  })

  it('should throw an error if cultivable area + vegetation area > total area', () => {
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
      cultivableAreaHectares: producerMockData.totalAreaHectares + 1,
    })

    // Assert
    expect(producerInstance).toThrow('Invalid area distribution')
  })

  it.todo('should be able to delete a producer')
  it.todo('should be able to edit a producer')
  it.todo('should be able to read a producer')
  it.todo('should be able to grow more than one crop in the farm')
  it.todo('should be able to display amount of farms in quantity')
  it.todo('should be able to display amount of farms in hectares - total area')
  it.todo('should be able to display amount of farms by state')
  it.todo('should be able to display amount of farms by crop')
  it.todo(
    'should be able to display amount of land usage - cultivable + vegetation',
  )
})
