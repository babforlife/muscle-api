import { DeleteResult } from 'mongodb'
import { Exercise, IExercise, ISeriesExercise, SeriesExercise, User } from '../models'
import { UserService } from './user.service'

class ExerciseService extends UserService {

  async upsert(exercise: IExercise): Promise<IExercise | null> {
    if (exercise._id === '') delete exercise._id
    exercise.userId = this.user.id
    if (!exercise._id) return await Exercise.create({ name: exercise.name, userId: this.user.id })
    return await Exercise.findOneAndUpdate({ _id: exercise._id, userId: this.user.id }, exercise, { upsert: true, new: true })
  }

  async getAll(): Promise<IExercise[]> {
    return await Exercise.find({ userId: this.user.id }).collation({ locale: 'fr', strength: 2 }).sort({ name: 1 })
  }

  async getById(_id: string): Promise<IExercise | null> {
    return await Exercise.findOne({ _id, userId: this.user.id })
  }

  async getActivitiesById(id: string): Promise<ISeriesExercise[] | null> {
    return await SeriesExercise.find({ userId: this.user.id, exercise: id })
  }

  async deleteById(_id: String): Promise<DeleteResult | null> {
    return await Exercise.findOneAndRemove({ _id, userId: this.user.id })
  }
}
export const exerciseService = new ExerciseService()