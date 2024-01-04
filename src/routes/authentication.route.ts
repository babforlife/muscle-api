import { FastifyInstance } from 'fastify'
import { AuthenticationController } from '../controllers/authentication.controller'

const url = '/authentication'
export async function authenticationRoutes(server: FastifyInstance) {
  server.post(`${url}/register`, AuthenticationController.register)
  server.post(`${url}/login`, AuthenticationController.login)
  server.post(`${url}/verify`, AuthenticationController.verify)
}
