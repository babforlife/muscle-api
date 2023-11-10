export * from './exercise.route'
import { RouteOptions } from 'fastify'
import fp from 'fastify-plugin'

export const routes = fp(async (server) => {
  for (const route of [...exerciseRoutes]) server.route(route as RouteOptions)
})
