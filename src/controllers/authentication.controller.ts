import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticationService } from '../services/authentication.service'
import { IUser } from '../models'

export const AuthenticationController = {
  add: async (request: FastifyRequest<{ Body: string }>, reply: FastifyReply): Promise<void> => {
    const user = JSON.parse(request.body) as IUser
    await AuthenticationService.add(user)
      .then(userReturned => {
        if (userReturned) return reply.type('application/json').code(200).send(userReturned)
        return reply.type('application/json').code(204).send()
      })
      .catch(error => reply.type('application/json').code(401).send({ errorMessage: error.message }))
  },
  login: async (request: FastifyRequest<{ Body: string }>, reply: FastifyReply): Promise<void> => {
    const { email, password } = JSON.parse(request.body)
    await AuthenticationService.login(email, password)
      .then(user => {
        const token = request.jwt.sign({ id: user._id, email: user.email })
        return reply.send({ token })
      })
      .catch(error => reply.type('application/json').code(401).send({ errorMessage: error.message }))
  }
}
