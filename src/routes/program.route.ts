import { FastifyInstance } from 'fastify'
import { programController } from '../controllers/program.controller'

const url = '/program'

export async function programRoutes(server: FastifyInstance) {
  server.get(url, { onRequest: [server.authenticate] }, programController.getAll)
  server.get(`${url}/:id`, { onRequest: [server.authenticate] }, programController.get)
  server.post(url, { onRequest: [server.authenticate] }, programController.save)
  server.delete(`${url}/:id`, { onRequest: [server.authenticate] }, programController.delete)
}
