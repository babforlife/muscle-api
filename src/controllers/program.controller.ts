import { IProgram } from '../models'
import { FastifyReply, FastifyRequest } from 'fastify'
import { programService } from '../services'
import { ParamsType } from '../utils'

export const programController = {
  getAll: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    programService.setUser(request.user)
    await programService.getAll()
      .then(programs => reply.type('application/json').code(200).send(programs))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  get: async (request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply): Promise<void> => {
    programService.setUser(request.user)
    await programService.get(request.params.id)
      .then(program => {
        if (program) return reply.type('application/json').code(200).send(program)
        return reply.type('application/json').code(204).send()
      })
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  save: async (request: FastifyRequest<{ Body: IProgram }>, reply: FastifyReply): Promise<void> => {
    programService.setUser(request.user)
    await programService.upsert(request.body)
      .then(programs => reply.type('application/json').code(200).send(programs))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  delete: async (request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply): Promise<void> => {
    programService.setUser(request.user)
    await programService.delete(request.params.id)
      .then(() => reply.type('application/json').code(200).send({}))
      .catch(error => reply.type('application/json').code(401).send({ errorMessage: error.message }))
  },
}
