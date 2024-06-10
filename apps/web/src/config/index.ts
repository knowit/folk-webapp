import { createDevConfig } from './envs/dev'
import { createProdConfig } from './envs/prod'

export const appConfig = getConfig()

function getConfig() {
  console.log('NODE_ENV:', process.env.NODE_ENV)
  console.log('Environment:', process.env.REACT_APP_ENV)
  switch (process.env.REACT_APP_ENV) {
    case 'production':
      return createProdConfig()
    case 'development':
      return createDevConfig()
    default:
      throw new Error(`Invalid REACT_APP_ENV ${process.env.REACT_APP_ENV}`)
  }
}
