import { FastifyInstance } from 'fastify'
import { exerciseController } from '../controllers'

const url = '/exercise'
export async function exerciseRoutes(server: FastifyInstance) {
  server.get(url, exerciseController.getAll)
  server.get(`${url}/:id`, exerciseController.get)
  server.get(`${url}/:id/activities`, exerciseController.getActivities)
  server.post(url, exerciseController.save)
  server.delete(`${url}/:id`, exerciseController.delete)
}
