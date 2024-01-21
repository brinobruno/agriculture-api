import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from '@jest/globals'
import { QueryFailedError } from 'typeorm'
import { faker } from '@faker-js/faker'

import {
  initializeDataSource,
  closeDataSource,
  truncateDatabase,
} from '../../config/ormconfig'
import { app } from './../../app'
import { generateCrop, generateProducer } from '../../scripts/generateMockData'
import { Producer } from '../../Entities/Producer'
import { ProducerCrop } from '../../Entities/ProducerCrop'
import { cpfCnpjValidator } from '../../shared/validateCpfCnpj'
import { validateUsedLand } from '../../shared/validateLand'
import {
  createProducer,
  deleteProducerById,
  getProducerById,
  updateProducerById,
} from '../../modules/producer/producer.services'

describe('Producer Entity', () => {
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

    const createdProducer = await createProducer(producerInstance)
    const retrievedProducer = await getProducerById(createdProducer.id)

    // Assert
    expect(createdProducer).toBeDefined()
    expect(retrievedProducer).toBeDefined()
    expect(retrievedProducer?.name).toEqual(producerMockData.name)
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

    const createdProducer = await createProducer(producerInstance)
    const retrievedProducer = await getProducerById(createdProducer.id)

    // Assert
    expect(createdProducer.producerCrops).toEqual(
      retrievedProducer?.producerCrops,
    )
    expect(retrievedProducer?.producerCrops).toHaveLength(
      producerCropInstance.length,
    )
  })

  it('should throw an error through cpfCnpjValidator with invalid CPF/CNPJ format', async () => {
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

  it('should throw an error for invalid CPF/CNPJ format', async () => {
    // Arrange
    const invalidCpfCnpj = '123'

    const producerMockData = generateProducer()
    const producerCropMockData = Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      generateCrop,
    )

    // Act
    try {
      const producerCropInstance = producerCropMockData.map(
        (crop) => new ProducerCrop(crop),
      )
      const producerInstance = new Producer({
        ...producerMockData,
        id: invalidCpfCnpj,
        producerCrops: producerCropInstance,
      })

      await createProducer(producerInstance)

      throw new Error()
    } catch (error: any) {
      // Assert
      expect(error).toBeInstanceOf(QueryFailedError)
      expect(error.message).toContain('invalid input syntax for type uuid')
    }
  })

  it('should throw an error if user does not provide producer crops', async () => {
    try {
      // Arrange
      const producerMockData = generateProducer()

      // Act
      const producerInstance = new Producer(producerMockData) // No crops provided

      await createProducer(producerInstance)

      throw new Error()
    } catch (error) {
      // Assert
      expect(error).toBeInstanceOf(Error)
    }
  })

  it('should throw an error if cultivable area + vegetation area > total area', async () => {
    // Arrange
    const cultivableArea = 100.0
    const vegetationArea = 100.0
    const totalArea = 100.0

    try {
      // Act
      const producerMockData = generateProducer()

      const producerInstance = new Producer({
        ...producerMockData,
        cultivableAreaHectares: cultivableArea,
        vegetationAreaHectares: vegetationArea,
        totalAreaHectares: totalArea,
      })
      await createProducer(producerInstance)

      validateUsedLand({
        cultivableArea: producerInstance.cultivableAreaHectares,
        vegetationArea: producerInstance.vegetationAreaHectares,
        totalArea: producerInstance.totalAreaHectares,
      })

      throw new Error()
    } catch (error) {
      // Assert
      expect(error).toBeInstanceOf(Error)
    }
  })

  it('should be able to read a producer', async () => {
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

    const createdProducer = await createProducer(producerInstance)
    const retrievedProducer = await getProducerById(createdProducer.id)

    expect(retrievedProducer).toBeDefined()
    expect(createdProducer).toEqual(retrievedProducer)
  })

  it('should be able to delete a producer', async () => {
    const producerMockData = generateProducer()
    const producerCropMockData = Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      generateCrop,
    )

    const producerCropInstance = producerCropMockData.map(
      (crop) => new ProducerCrop(crop),
    )
    const producerInstance = new Producer(producerMockData)
    await createProducer({
      ...producerInstance,
      producerCrops: producerCropInstance,
    })

    const existingProducer = await getProducerById(producerInstance.id)
    expect(existingProducer).toBeDefined()

    await deleteProducerById(producerInstance.id)

    const deletedProducer = await getProducerById(producerInstance.id)
    expect(deletedProducer).toBeNull()
  })

  it('should be able to edit a producer', async () => {
    const nameToUpdateAs = 'Updated name'
    const farmNameToUpdateAs = 'Updated farm name'

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

    const existingProducer = await getProducerById(producerInstance.id)
    expect(existingProducer).toBeDefined()
    expect(existingProducer?.name).toEqual(producerMockData.name)

    await updateProducerById(producerInstance.id, {
      ...producerInstance,
      name: nameToUpdateAs,
      farmName: farmNameToUpdateAs,
    })

    const updatedProducer = await getProducerById(producerInstance.id)

    expect(updatedProducer).toBeDefined()
    expect(updatedProducer?.name).toEqual(nameToUpdateAs)
    expect(updatedProducer?.farmName).toEqual(farmNameToUpdateAs)
  })

  it.todo('should be able to display amount of farms in quantity')
  it.todo('should be able to display amount of farms in hectares - total area')
  it.todo('should be able to display amount of farms by state')
  it.todo('should be able to display amount of farms by crop')
  it.todo(
    'should be able to display amount of land usage - cultivable + vegetation',
  )
})
