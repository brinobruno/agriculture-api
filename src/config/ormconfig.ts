import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { env } from '../env'

const connectDB = new DataSource({
  type: 'postgres',
  url: env.DATABASE_URI,
  logging: false,
  synchronize: true,
  entities: ['./src/Entities/**/*.ts'],
  migrations: ['./src/migrations/*.ts'],
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

export { connectDB, initializeDataSource, closeDataSource }
