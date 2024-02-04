import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from 'vitest'

import {
  initializeDataSource,
  closeDataSource,
  truncateDatabase,
} from '../config/ormconfig'
import { app } from '../app'
import { producerService } from '../modules/producer/producer.services'
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
      await producerService.createProducer(producerInstance)

      producersCount++
    }

    const farmsTotalQuantity = await dashboardService.getFarmsTotalQuantity()

    // Assert
    expect(farmsTotalQuantity).toEqual(producersCount)
  })

  it('should be able to display amount of farms in hectares - total area', async () => {
    // Arrange
    const numberOfProducers = CONSTANTS.TEST_NUMBER_PRODUCERS_TO_CREATE
    let totalHectares = 0

    // Act
    for (let i = 0; i < numberOfProducers; i++) {
      const { producerInstance } = createMockProducer()
      await producerService.createProducer(producerInstance)

      totalHectares += producerInstance.totalAreaHectares
    }

    const farmsTotalHectares = await dashboardService.getFarmsTotalHectares()

    // Assert
    expect(farmsTotalHectares).toEqual(totalHectares)
  })

  it('should be able to display amount of farms by state', async () => {
    // Arrange
    const numberOfProducers = CONSTANTS.TEST_NUMBER_PRODUCERS_TO_CREATE
    let countSum = 0

    // Act
    for (let i = 0; i < numberOfProducers; i++) {
      const { producerInstance } = createMockProducer()
      await producerService.createProducer(producerInstance)
    }

    const farmsByState = await dashboardService.getFarmsByState()

    for (const value of Object.values(farmsByState)) {
      countSum += Number(value)
    }

    // Assert
    expect(farmsByState).toBeDefined()
    expect(countSum).toBe(CONSTANTS.TEST_NUMBER_PRODUCERS_TO_CREATE)
  })

  it('should be able to display amount of farms by crop', async () => {
    // Arrange
    const numberOfProducers = CONSTANTS.TEST_NUMBER_PRODUCERS_TO_CREATE
    const expectedFarmsByCrop: {
      [crop: string]: number
    } = {}

    // Act
    for (let i = 0; i < numberOfProducers; i++) {
      const { producerInstance } = createMockProducer()
      await producerService.createProducer(producerInstance)

      producerInstance.producerCrops.forEach(({ cropName }) => {
        expectedFarmsByCrop[cropName] = (expectedFarmsByCrop[cropName] || 0) + 1
      })
    }

    const farmsByCrop = await dashboardService.getFarmsByCrop()

    // Assert
    expect(farmsByCrop).toEqual(expectedFarmsByCrop)
  })

  it('should be able to display amount of land usage - cultivable + vegetation', async () => {
    // Arrange
    const numberOfProducers = CONSTANTS.TEST_NUMBER_PRODUCERS_TO_CREATE
    const expectedLandUsage = { cultivable: 0, vegetation: 0 }

    // Act
    for (let i = 0; i < numberOfProducers; i++) {
      const { producerInstance } = createMockProducer()
      await producerService.createProducer(producerInstance)

      expectedLandUsage.cultivable += producerInstance.cultivableAreaHectares
      expectedLandUsage.vegetation += producerInstance.vegetationAreaHectares
    }

    const landUsage = await dashboardService.getLandUsageRatio()

    // Assert
    expect(landUsage).toBeDefined()
    expect(landUsage.cultivableArea).toBe(expectedLandUsage.cultivable)
    expect(landUsage.vegetationArea).toBe(expectedLandUsage.vegetation)
  })
})
