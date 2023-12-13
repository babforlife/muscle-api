export * from './exercise.route'
export * from './program.route'
export * from './activity.route'

import { exerciseRoutes, programRoutes, activityRoutes } from '.';
import { RouteOptions } from 'fastify'
import fp from 'fastify-plugin'

const processRoutes = [...exerciseRoutes, ...programRoutes, ...activityRoutes]

export const routes = fp(async (server) => {
  for (const route of processRoutes) server.route(route as RouteOptions)
})
