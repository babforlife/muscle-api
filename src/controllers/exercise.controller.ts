import { Exercise } from './../models/exercise/exercise.model';
import { FastifyReply } from 'fastify'
import { exerciseService } from '../services/exercise.service'

interface FastifyRequest {
  body: any
  params: {
    id: string
  }
}

export const exerciseController = {
  getAll: async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    await exerciseService.getAll()
      .then(exercises => reply.type('application/json').code(200).send(exercises))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  get: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    await exerciseService.get(request.params.id)
      .then(exercise => {
        if (exercise) return reply.type('application/json').code(200).send(exercise)
        return reply.type('application/json').code(204).send()
      })
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  save: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const exercise = JSON.parse(request.body)
    await Exercise.create({name: exercise.name})
      .then(exercises => reply.type('application/json').code(200).send(exercises))
      .catch(error => reply.type('application/json').code(400).send({ errorMessage: error.message }))
  },
  delete: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    await exerciseService.delete(request.params.id)
      .then(() => {
        console.log('oki')
        return reply.type('application/json').code(200).send({})
      })
      .catch(error => {
        console.log('err')
        return reply.type('application/json').code(401).send({ errorMessage: error.message })
      })
  },
}
