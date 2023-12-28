import { IProgram } from '../models';
import { FastifyReply, FastifyRequest } from 'fastify'
import { programService } from '../services'
import { ParamsType } from '../utils'

export const programController = {
  getAll: async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    await programService.getAll()
      .then(programs => reply.type('application/json').code(200).send(programs))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  get: async (request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply): Promise<void> => {
    await programService.get(request.params.id)
      .then(program => {
        if (program) return reply.type('application/json').code(200).send(program)
        return reply.type('application/json').code(204).send()
      })
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  save: async (request: FastifyRequest<{ Body: string }>, reply: FastifyReply): Promise<void> => {
    const program = JSON.parse(request.body) as IProgram
    await programService.upsert(program)
      .then(programs => reply.type('application/json').code(200).send(programs))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  delete: async (request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply): Promise<void> => {
    await programService.delete(request.params.id)
      .then(() => reply.type('application/json').code(200).send({}))
      .catch(error => reply.type('application/json').code(401).send({ errorMessage: error.message }))
  },
}
