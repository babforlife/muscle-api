import { JWT } from '@fastify/jwt'
import { User } from '../models'

export type ParamsType = { id: string }

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT,
  }
  export interface FastifyInstance {
    authenticate: any
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: User
  }
}