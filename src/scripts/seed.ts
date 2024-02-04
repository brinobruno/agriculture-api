import { initializeDataSource, closeDataSource } from '../config/ormconfig'
import { producerService } from '../modules/producer/producer.services'
import { createMockProducer } from '../scripts/createMockProducer'

async function seedDatabase(numberOfProducers: number): Promise<void> {
  try {
    await initializeDataSource()

    for (let i = 0; i < numberOfProducers; i++) {
      const { producerInstance } = createMockProducer()
      await producerService.createProducer(producerInstance)
    }

    console.log(`Database seeded with ${numberOfProducers} producers.`)
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await closeDataSource()
  }
}

// Get the number of producers to seed from the command line arguments
const numberOfProducersToSeed = parseInt(process.argv[2], 10)

// Validate that a valid number is provided
if (isNaN(numberOfProducersToSeed) || numberOfProducersToSeed <= 0) {
  console.error('Please provide a valid number of producers to seed.')
  process.exit(1)
}

seedDatabase(numberOfProducersToSeed)
