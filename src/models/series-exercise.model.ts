import { Series, IExercise } from './';
import { model, Schema, Document } from 'mongoose'

export interface ISeriesExercise extends Document {
  _id?: string
  exercise: IExercise
  series: Series[]
}

export const seriesExerciseSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  exercise: { type: Schema.Types.ObjectId, ref: 'exercises' },
  series: [{ type: Schema.Types.Mixed }],
})

export const SeriesExercise = model<ISeriesExercise>('seriesExercises', seriesExerciseSchema)