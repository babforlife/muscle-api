import { DeleteResult } from 'mongodb'
import { program, IProgram } from '../models'

export const programService = {
  async upsert(session: IProgram): Promise<IProgram | null> {
    if(session._id === '') delete session._id
    if(!session._id) return await program.create({...session})
    return await program.findOneAndUpdate({ _id: session._id }, session, { upsert: true, new: true });
  },
  async getAll(): Promise<IProgram[]> {
    return await program.find().collation({locale: 'fr', strength: 2 }).sort({name: 1}).populate('exercises')
  },
  async get(id: string): Promise<IProgram | null> {
    return await program.findById(id).populate('exercises')
  },
  async delete(id: String): Promise<DeleteResult | null> {
    return await program.findOneAndRemove({_id: id})
  }
}
