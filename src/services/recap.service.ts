import { DeleteResult } from 'mongodb'
import { Recap, IRecap } from '../models'

export const recapService = {
  async upsert(recap: IRecap): Promise<IRecap | null> {
    if(recap._id === '') delete recap._id
    if(!recap._id) return await Recap.create({...recap})
    return await Recap.findOneAndUpdate({ _id: recap._id }, recap, { upsert: true, new: true });
  },
  async getAll(): Promise<IRecap[]> {
    return await Recap.find().collation({locale: 'fr', strength: 2 }).sort({name: 1}).populate('exercises')
  },
  async get(id: string): Promise<IRecap | null> {
    return await Recap.findById(id).populate('exercises')
  },
  async delete(id: String): Promise<DeleteResult | null> {
    return await Recap.findOneAndRemove({_id: id})
  }
}
