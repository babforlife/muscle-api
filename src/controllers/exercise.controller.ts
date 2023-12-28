import { IExercise } from '../models';
import { FastifyReply, FastifyRequest } from 'fastify'
import { exerciseService } from '../services'
import { ParamsType } from '../utils'

export const exerciseController = {
  getAll: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    await exerciseService.getAll()
      .then(exercises => reply.type('application/json').code(200).send(exercises))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  get: async (request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply): Promise<void> => {
    await exerciseService.get(request.params.id)
      .then(exercise => {
        if (exercise) return reply.type('application/json').code(200).send(exercise)
        return reply.type('application/json').code(204).send()
      })
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  getActivities: async (request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply): Promise<void> => {
    await exerciseService.getActivities(request.params.id)
      .then(activities => reply.type('application/json').code(200).send(activities))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  save: async (request: FastifyRequest<{ Body: string }>, reply: FastifyReply): Promise<void> => {
    const exercise = JSON.parse(request.body) as IExercise
    await exerciseService.upsert(exercise)
      .then(exercises => reply.type('application/json').code(200).send(exercises))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  delete: async (request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply): Promise<void> => {
    await exerciseService.delete(request.params.id)
      .then(() => reply.type('application/json').code(200).send({}))
      .catch(error =>  reply.type('application/json').code(401).send({ errorMessage: error.message }))
  },
}
