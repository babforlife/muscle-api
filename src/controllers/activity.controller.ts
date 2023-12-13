import { IActivity } from '../models';
import { FastifyReply } from 'fastify'
import { activityService } from '../services'

interface FastifyRequest {
  body: any
  params: {
    id: string
  }
}

export const activityController = {
  save: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const session = JSON.parse(request.body) as IActivity
    await activityService.upsert(session)
      .then(sessions => reply.type('application/json').code(200).send(sessions))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  getAll: async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    await activityService.getAll()
      .then(activity => reply.type('application/json').code(200).send(activity))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  get: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    await activityService.getById(request.params.id)
      .then(activity => reply.type('application/json').code(200).send(activity))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  delete: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    await activityService.deleteById(request.params.id)
      .then(activity => reply.type('application/json').code(200).send(activity))
      .catch(error => reply.type('application/json').code(401).send({ errorMessage: error.message }))
  },
}
