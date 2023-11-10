import { DeleteResult } from 'mongodb'
import { Session, ISession } from '../models'

export const sessionService = {
  async upsert(session: ISession): Promise<ISession | null> {
    if(session._id === '') return await Session.create({name: session.name})
    return await Session.findOneAndUpdate({ _id: session._id }, session, { upsert: true, new: true });
  },
  async getAll(): Promise<ISession[]> {
    return await Session.find().collation({locale: 'fr', strength: 2 }).sort({name: 1})
  },
  async get(id: string): Promise<ISession | null> {
    return await Session.findById(id)
  },
  async delete(id: String): Promise<DeleteResult | null> {
    return await Session.findOneAndRemove({_id: id})
  }
}
