import 'dotenv/config'
import { fastify, FastifyListenOptions, FastifyReply, FastifyRequest } from 'fastify'
import { fastifyJwt } from '@fastify/jwt'
import { fastifyCors } from '@fastify/cors'
import mongoose from 'mongoose'
import { routes } from './routes'

if (!process.env.DATABASE_URI) throw new Error('DATABASE_URI is not defined')
if (!process.env.FASTIFY_PORT) throw new Error('FASTIFY_PORT is not defined')
if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined')
if (!process.env.CORS_ORIGINS) throw new Error('CORS_ORIGINS is not defined')

export const server = fastify({ logger: true })
  .register(fastifyCors, { origin: process.env.CORS_ORIGINS?.split(';')} )
  .register(routes)
  .register(fastifyJwt, { secret: process.env.JWT_SECRET })
  .addHook('onRequest', (request, _res, next) => { request.jwt = server.jwt; return next() })
  .decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => await request.jwtVerify().catch((error) => reply.send(error)))

// graceful shutdown
const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => process.on(signal, async () => { await server.close(); process.exit(0) }))

mongoose.connect(process.env.DATABASE_URI)
  .then(() => server.log.info('connected to database'))
  .catch((error) => server.log.error(`database ${error.message}`))

server.listen({ port: +process.env.FASTIFY_PORT, host: '0.0.0.0' } as FastifyListenOptions)
  .catch((error: Error) => server.log.error(error.message))
