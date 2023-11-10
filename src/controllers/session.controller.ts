import { Session, ISession } from '../models';
import { FastifyReply } from 'fastify'
import { sessionService } from '../services'

interface FastifyRequest {
  body: any
  params: {
    id: string
  }
}

export const sessionController = {
  getAll: async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    await sessionService.getAll()
      .then(sessions => reply.type('application/json').code(200).send(sessions))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  get: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    await sessionService.get(request.params.id)
      .then(session => {
        if (session) return reply.type('application/json').code(200).send(session)
        return reply.type('application/json').code(204).send()
      })
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  save: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const session = JSON.parse(request.body) as ISession
    await sessionService.upsert(session)
      .then(sessions => reply.type('application/json').code(200).send(sessions))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  delete: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    await sessionService.delete(request.params.id)
      .then(() => reply.type('application/json').code(200).send({}))
      .catch(error => reply.type('application/json').code(401).send({ errorMessage: error.message }))
  },
}
