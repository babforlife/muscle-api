import { DeleteResult } from 'mongodb'
import { Program, IProgram } from '../models'
import { UserService } from './user.service'

class ProgramService extends UserService {

  async upsert(session: IProgram): Promise<IProgram | null> {
    if (session._id === '') delete session._id
    if (!session._id) return await Program.create({ ...session, userId: this.user.id })
    return await Program.findOneAndUpdate({ _id: session._id, userId: this.user.id }, session, { upsert: true, new: true })
  }

  async getAll(): Promise<IProgram[]> {
    return await Program.find({ userId: this.user.id }).collation({ locale: 'fr', strength: 2 }).sort({ name: 1 }).populate('exercises')
  }

  async get(_id: string): Promise<IProgram | null> {
    return await Program.findOne({ _id, userId: this.user.id }).populate('exercises')
  }

  async delete(_id: String): Promise<DeleteResult | null> {
    return await Program.findOneAndRemove({ _id, userId: this.user.id })
  }
}
export const programService = new ProgramService()