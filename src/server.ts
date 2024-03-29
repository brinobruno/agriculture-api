import 'reflect-metadata'
import { app } from './app'
import { env } from './env'
import { initializeDataSource } from './config/ormconfig'

app.register(async () => await initializeDataSource())

app
  .listen({
    host: '0.0.0.0', // Listens on all IPv4 addresses (Solves my docker req issues)
    port: env.PORT,
  })
  .then(() => {
    env.NODE_ENV === 'development'
      ? console.log(`HTTP Server Running on port: ${env.PORT}`)
      : console.log('HTTP Server Running!')
  })
