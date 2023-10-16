import fastify, { FastifyListenOptions } from 'fastify'
import cors from '@fastify/cors'
import mongoose from 'mongoose'
import { environment } from './environments'
import { routes } from './routes'

const server = fastify({ logger: true })
void server.register(cors, {})
void server.register(routes)
const start = async () => {
  server.listen({port: environment.port, host:'0.0.0.0'} as FastifyListenOptions).then(() => {
      console.log(`\n API started on http://localhost:${environment.port} \n`)
      return
    })
    .catch((error: Error) => {
      server.log.error(error.message)
      throw new Error('Server error')
    })
}

mongoose.connect(environment.dbUri)
  .then(() => {
    console.log('connected to DB')
    return
  })
  .catch((error: Error) => {
    console.error(error.message)
    throw new Error('database error')
  })

start()