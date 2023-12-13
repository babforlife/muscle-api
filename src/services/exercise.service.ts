import { DeleteResult } from 'mongodb'
import { Exercise, IExercise, ISeriesExercise, SeriesExercise } from '../models'

export const exerciseService = {
  async upsert(exercise: IExercise): Promise<IExercise | null> {
    if(exercise._id === '') delete exercise._id
    if(!exercise._id) return await Exercise.create({name: exercise.name})
    return await Exercise.findOneAndUpdate({ _id: exercise._id }, exercise, { upsert: true, new: true });
  },
  async getAll(): Promise<IExercise[]> {
    return await Exercise.find().collation({locale: 'fr', strength: 2 }).sort({name: 1})
  },
  async get(id: string): Promise<IExercise | null> {
    return await Exercise.findById(id)
  },
  async getActivities(id: string): Promise<ISeriesExercise[] | null> {
    return await SeriesExercise.find({ exercise: id });
  },
  async delete(id: String): Promise<DeleteResult | null> {
    return await Exercise.findOneAndRemove({_id: id})
  }
}
