import 'reflect-metadata'
import { app } from './app'
import { env } from './env'
import connectDB from './config/ormconfig'

app.register(async () => await connectDB)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    env.NODE_ENV === 'development'
      ? console.log(`HTTP Server Running on port: ${env.PORT}`)
      : console.log('HTTP Server Running!')
  })
