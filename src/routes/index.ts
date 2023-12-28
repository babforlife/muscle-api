export { activityRoutes } from './activity.route'
export { exerciseRoutes } from './exercise.route'
export { programRoutes } from './program.route'

import { exerciseRoutes, programRoutes, activityRoutes } from '.';
import fp from 'fastify-plugin'

const processRoutes = [activityRoutes, exerciseRoutes, programRoutes]

export const routes = fp(async (server) => {
  for (const route of processRoutes) server.register(route)
})
