export { activityRoutes } from './activity.route'
export { exerciseRoutes } from './exercise.route'
export { programRoutes } from './program.route'
export { authenticationRoutes } from './authentication.route'

import { exerciseRoutes, programRoutes, activityRoutes, authenticationRoutes } from '.'
import fp from 'fastify-plugin'

const processRoutes = [activityRoutes, exerciseRoutes, programRoutes, authenticationRoutes]

export const routes = fp(async (server) => {
  for (const route of processRoutes) server.register(route)
})
