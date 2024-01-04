import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticationService } from '../services/authentication.service'
import { IUser, User } from '../models'

export const AuthenticationController = {
  register: async (request: FastifyRequest<{ Body: IUser }>, reply: FastifyReply): Promise<void> => {
    await AuthenticationService.register(request.body)
      .then(user => {
        const token = request.jwt.sign({ id: user._id, email: user.email })
        return reply.send({ token })
      })
      .catch(error => reply.type('application/json').code(401).send({ errorMessage: error.message }))
  },
  login: async (request: FastifyRequest<{ Body: IUser }>, reply: FastifyReply): Promise<void> => {
    const { email, password } = request.body
    await AuthenticationService.login(email, password)
      .then(user => {
        const token = request.jwt.sign({ id: user._id, email: user.email })
        return reply.send({ token })
      })
      .catch(error => reply.type('application/json').code(401).send({ errorMessage: error.message }))
  },
  verify: async (request: FastifyRequest<{ Body: string }>, reply: FastifyReply): Promise<void> => {
    return await request.jwtVerify().then((res) => reply.send(res)).catch((err) => reply.send(err))
  }
}
