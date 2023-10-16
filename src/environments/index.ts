import { Environment } from '../models/environment.model'
import { devEnvironment as devEnvironment } from './environment.dev'

export const environment = process.platform === 'win32' ? devEnvironment : new Environment({})
