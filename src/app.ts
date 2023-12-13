import 'dotenv/config'
import fastify, { FastifyListenOptions } from 'fastify'
import cors from '@fastify/cors'
import mongoose from 'mongoose'
import { routes } from './routes'

if(!process.env.DATABASE_URI) throw new Error('DATABASE_URI is not defined')
if(!process.env.FASTIFY_PORT) throw new Error('FASTIFY_PORT is not defined')

const server = fastify({ logger: true })
void server.register(cors, {})
void server.register(routes)
const start = async () => {
  server.listen({port: process.env.FASTIFY_PORT, host:'0.0.0.0'} as FastifyListenOptions).then(() => {
      console.log(`\n API started on http://localhost:${process.env.FASTIFY_PORT} \n`)
      return
    })
    .catch((error: Error) => {
      server.log.error(error.message)
      throw new Error('Server error')
    })
}
mongoose.connect(process.env.DATABASE_URI)
  .then(() => {
    console.log('connected to DB')
    return
  })
  .catch((error: Error) => {
    console.error(error.message)
    throw new Error('database error')
  })

start()
