import { model, Schema, Document } from 'mongoose'
import { ISeriesExercise, seriesExerciseSchema } from '.'

export interface IActivity extends Document {
  _id?: string;
  name: string;
  start: Date;
  end: Date;
  session: ISeriesExercise[]
}

export const activitySchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String },
  start: { type: Date },
  end: { type: Date },
  session: { type: [Schema.Types.ObjectId], ref: 'seriesExercises', required: true },
})

export const Activity = model<IActivity>('activities', activitySchema)