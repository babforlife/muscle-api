export * from './exercise.route'
export * from './program.route'

import { exerciseRoutes, programRoutes } from '.';
import { RouteOptions } from 'fastify'
import fp from 'fastify-plugin'

const processRoutes = [...exerciseRoutes, ...programRoutes]

export const routes = fp(async (server) => {
  for (const route of processRoutes) server.route(route as RouteOptions)
})
