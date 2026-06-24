import { app } from './app.js'
import { env } from './config/env.js'
import { connectDb } from './database/connectDb.js'

async function bootstrap() {
  await connectDb()

  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`)
  })
}

bootstrap()