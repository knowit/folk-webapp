import { createDevConfig } from './envs/dev'
import { createProdConfig } from './envs/prod'

export const appConfig = getConfig()

function getConfig() {
  console.log('Environment:', process.env.NODE_ENV)
  switch (process.env.NODE_ENV) {
    case 'production':
      return createProdConfig()
    case 'development':
      return createDevConfig()
    default:
      throw new Error(`Invalid NODE_ENV ${process.env.NODE_ENV}`)
  }
}
