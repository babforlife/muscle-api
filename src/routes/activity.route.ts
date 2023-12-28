import { FastifyInstance } from 'fastify'
import { activityController } from '../controllers/activity.controller'

const url = '/activity'
export async function activityRoutes(server: FastifyInstance) {
  server.get(url, activityController.getAll)
  server.get(`${url}/:id`, activityController.get)
  server.post(url, activityController.save)
  server.delete(`${url}/:id`, activityController.delete)
}
