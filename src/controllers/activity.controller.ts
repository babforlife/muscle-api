import { IActivity } from '../models'
import { FastifyReply, FastifyRequest } from 'fastify'
import { activityService, seriesExerciseService } from '../services'
import { ParamsType } from '../utils'

export const activityController = {
  save: async (request: FastifyRequest<{ Body: string }>, reply: FastifyReply): Promise<void> => {
    const session = JSON.parse(request.body) as IActivity
    activityService.setUser(request.user)
    seriesExerciseService.setUser(request.user)
    await activityService.upsert(session)
      .then(sessions => reply.type('application/json').code(200).send(sessions))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  getAll: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    activityService.setUser(request.user)
    await activityService.getAll()
      .then(activity => reply.type('application/json').code(200).send(activity))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  get: async (request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply): Promise<void> => {
    activityService.setUser(request.user)
    await activityService.getById(request.params.id)
      .then(activity => reply.type('application/json').code(200).send(activity))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  delete: async (request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply): Promise<void> => {
    activityService.setUser(request.user)
    await activityService.deleteById(request.params.id)
      .then(activity => reply.type('application/json').code(200).send(activity))
      .catch(error => reply.type('application/json').code(401).send({ errorMessage: error.message }))
  },
}
