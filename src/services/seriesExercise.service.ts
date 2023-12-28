import { DeleteResult } from 'mongodb'
import { ISeriesExercise, SeriesExercise } from '../models'
import { UserService } from './user.service'

class SeriesExerciseService extends UserService {
  async create(seriesExercise: ISeriesExercise): Promise<ISeriesExercise> {
    seriesExercise.userId = this.user.id
    return await SeriesExercise.create(seriesExercise)
  }

  async deleteOne(_id: string): Promise<DeleteResult> {
    return await SeriesExercise.deleteOne({ _id })
  }
}
export const seriesExerciseService = new SeriesExerciseService()