import { DeleteResult, ObjectId } from 'mongodb'
import { Exercise, IExercise } from './../models/exercise/exercise.model'

export const exerciseService = {
  async save(exercise: IExercise): Promise<IExercise> {
    return new Exercise(exercise).save()
  },
  async getAll(): Promise<IExercise[]> {
    return await Exercise.find()
  },
  async get(id: string): Promise<IExercise | null> {
    return await Exercise.findById(id)
  },
  async delete(id: String): Promise<DeleteResult | null> {
    return await Exercise.findOneAndRemove({_id: id})
  }
}
