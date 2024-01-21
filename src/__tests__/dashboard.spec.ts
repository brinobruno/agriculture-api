import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from '@jest/globals'

import {
  initializeDataSource,
  closeDataSource,
  truncateDatabase,
} from '../config/ormconfig'
import { app } from './../app'
import { createProducer } from '../modules/producer/producer.services'
import { dashboardService } from '../modules/dashboard/dashboard.services'
import { CONSTANTS } from '../shared/constants'
import { createMockProducer } from '../scripts/createMockProducer'

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
    const numberOfProducers = CONSTANTS.TEST_NUMBER_PRODUCERS_TO_CREATE
    let producersCount = 0

    // Act
    for (let i = 0; i < numberOfProducers; i++) {
      const { producerInstance } = createMockProducer()
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
