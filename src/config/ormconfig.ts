import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { env } from '../env'
import { Producer } from '../Entities/Producer'
import { ProducerCrop } from '../Entities/ProducerCrop'

const connectDB = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  logging: false,
  synchronize: true,
  entities: [Producer, ProducerCrop],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
})

// Condition to avoid beforeEach/afterEach excess logging
const isNotTestEnv = env.NODE_ENV !== 'test'

const initializeDataSource = async () => {
  try {
    await connectDB.initialize()
    if (isNotTestEnv) console.log(`Data Source has been initialized`)
  } catch (err) {
    console.error(`Data Source initialization error`, err)
  }
}

const closeDataSource = async () => {
  try {
    await connectDB.destroy()
    if (isNotTestEnv) console.log(`Data Source has been closed`)
  } catch (err) {
    console.error(`Error closing Data Source`, err)
  }
}

const truncateDatabase = async () => {
  const entities = connectDB.entityMetadatas

  for (const entity of entities) {
    const repository = connectDB.manager.getRepository(entity.name)
    await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE;`)
  }
}

export { connectDB, initializeDataSource, closeDataSource, truncateDatabase }
