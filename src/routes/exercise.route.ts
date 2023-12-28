import { FastifyInstance } from 'fastify'
import { exerciseController } from '../controllers'

const url = '/exercise'
export async function exerciseRoutes(server: FastifyInstance) {
  server.get(url, { onRequest: [server.authenticate] }, exerciseController.getAll)
  server.get(`${url}/:id`, { onRequest: [server.authenticate] }, exerciseController.get)
  server.get(`${url}/:id/activities`, { onRequest: [server.authenticate] }, exerciseController.getActivities)
  server.post(url, { onRequest: [server.authenticate] }, exerciseController.save)
  server.delete(`${url}/:id`, { onRequest: [server.authenticate] }, exerciseController.delete)
}
