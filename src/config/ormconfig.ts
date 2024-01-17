import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { env } from '../env'

const connectDB = new DataSource({
  type: 'postgres',
  url: env.DATABASE_URI,
  logging: false,
  synchronize: true,
  entities: ['./src/Entities/**/*.ts'],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
})

connectDB
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`)
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err)
  })

export default connectDB
