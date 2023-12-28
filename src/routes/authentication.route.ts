import { FastifyInstance } from 'fastify'
import { AuthenticationController } from '../controllers/authentication.controller'

const url = '/users'

export async function authenticationRoutes(server: FastifyInstance) {
  server.post(url, AuthenticationController.add)
  server.post(`${url}/login`, AuthenticationController.login)
}
