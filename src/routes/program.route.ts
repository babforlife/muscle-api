import { FastifyInstance } from 'fastify'
import { programController } from '../controllers/program.controller'

const url = '/program'

export async function programRoutes(server: FastifyInstance) {
  server.get(url, programController.getAll)
  server.get(`${url}/:id`, programController.get)
  server.post(url, programController.save)
  server.delete(`${url}/:id`, programController.delete)
}
