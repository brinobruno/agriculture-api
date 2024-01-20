// import request from 'supertest'
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from '@jest/globals'
import { faker } from '@faker-js/faker'

import {
  connectDB,
  initializeDataSource,
  closeDataSource,
} from '../../config/ormconfig'
import { app } from './../../app'
import { generateCrop, generateProducer } from '../../scripts/generateMockData'
import { Producer } from '../../Entities/Producer'
import { ProducerCrop } from '../../Entities/ProducerCrop'
import { cpfCnpjValidator } from '../../shared/validateCpfCnpj'
import { validateUsedLand } from '../../shared/validateLand'
import { saveProducer } from '../../modules/producer/producer.repository'

describe('Producer Entity', () => {
  /* Make sure app (and thefore its routes) and db are done loading before testing */
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  beforeEach(async () => await initializeDataSource())
  afterEach(async () => {
    await connectDB.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.query('ROLLBACK;')
    })
    await closeDataSource()
  })

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

    const createdProducer = await saveProducer(producerInstance)

    console.log(createdProducer)

    // Assert
    expect(createdProducer).toBeDefined()
  })

  it('should create producer crops', async () => {
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

  it('should throw an error for invalid CPF/CNPJ', async () => {
    // Arrange
    const invalidCpfCnpj = '123'

    expect(() => {
      try {
        // Act
        cpfCnpjValidator(invalidCpfCnpj)
      } catch (error) {
        throw new Error()
      }
      // Assert
    }).toThrow(Error)
  })

  it('should throw an error if cultivable area + vegetation area > total area', async () => {
    // Arrange
    const cultivableArea = 100.0
    const vegetationArea = 100.0
    const totalArea = 100.0

    expect(() => {
      try {
        // Act
        validateUsedLand({ cultivableArea, vegetationArea, totalArea })
      } catch (error) {
        throw new Error()
      }
      // Assert
    }).toThrow(Error)
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
