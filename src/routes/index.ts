export * from './exercise.route'
export * from './session.route'

import { exerciseRoutes, sessionRoutes } from '.';
import { RouteOptions } from 'fastify'
import fp from 'fastify-plugin'

const processRoutes = [...exerciseRoutes, ...sessionRoutes]

export const routes = fp(async (server) => {
  for (const route of processRoutes) server.route(route as RouteOptions)
})
