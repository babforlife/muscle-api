import { FastifyInstance } from 'fastify'
import { activityController } from '../controllers/activity.controller'

const url = '/activity'
export async function activityRoutes(server: FastifyInstance) {
  server.get(url, { onRequest: [server.authenticate] }, activityController.getAll)
  server.get(`${url}/:id`, { onRequest: [server.authenticate] }, activityController.get)
  server.post(url, { onRequest: [server.authenticate] }, activityController.save)
  server.delete(`${url}/:id`, { onRequest: [server.authenticate] }, activityController.delete)
}
