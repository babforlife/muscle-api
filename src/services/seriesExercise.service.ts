import { DeleteResult } from 'mongodb'
import { Activity, ISeriesExercise, SeriesExercise } from '../models'

export const seriesExerciseService = {
  async create(seriesExercise: ISeriesExercise): Promise<ISeriesExercise> {
    return await SeriesExercise.create(seriesExercise);
  },
  async deleteOne(_id: string): Promise<DeleteResult> {
    return await SeriesExercise.deleteOne({ _id });
  }
}
