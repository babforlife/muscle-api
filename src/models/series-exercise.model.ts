import { Series, IExercise } from './';
import { model, Schema, Document } from 'mongoose'

export interface ISeriesExercise extends Document {
  _id?: string
  userId: string
  exercise: IExercise
  series: Series[]
}

export const seriesExerciseSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  exercise: { type: Schema.Types.ObjectId, ref: 'exercises' },
  series: [{ type: Schema.Types.Mixed }],
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
})

export const SeriesExercise = model<ISeriesExercise>('seriesExercises', seriesExerciseSchema)