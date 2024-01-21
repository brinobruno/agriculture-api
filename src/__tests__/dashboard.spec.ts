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
  initializeDataSource,
  closeDataSource,
  truncateDatabase,
} from '../config/ormconfig'
import { app } from './../app'
import { generateCrop, generateProducer } from '../scripts/generateMockData'
import { Producer } from '../Entities/Producer'
import { ProducerCrop } from '../Entities/ProducerCrop'
import { createProducer } from '../modules/producer/producer.services'
import { dashboardService } from '../modules/dashboard/dashboard.services'

describe('Dashboard features', () => {
  /* Make sure app (and thefore its routes) and db are done loading before testing */
  beforeAll(async () => await app.ready())
  afterAll(async () => await app.close())

  beforeEach(async () => {
    await initializeDataSource()
    await truncateDatabase()
  })
  afterEach(async () => {
    await truncateDatabase()
    await closeDataSource()
  })

  it('should be able to display amount of farms in quantity', async () => {
    // Arrange
    const numberOfProducers = 5
    let producersCount = 0

    // Act
    for (let i = 0; i < numberOfProducers; i++) {
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

      await createProducer(producerInstance)

      producersCount++
    }

    const farmsTotalQuantity = await dashboardService.getFarmsTotalQuantity()

    // Assert
    expect(farmsTotalQuantity).toEqual(producersCount)
  })

  it.todo('should be able to display amount of farms in hectares - total area')
  it.todo('should be able to display amount of farms by state')
  it.todo('should be able to display amount of farms by crop')
  it.todo(
    'should be able to display amount of land usage - cultivable + vegetation',
  )
})
