import { model, Schema, Document } from 'mongoose'

export interface IExercise extends Document {
  _id?: string;
  userId: string;
  name: string;
}

export const ExerciseSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  name: { type: String },
})

export const Exercise = model<IExercise>('exercises', ExerciseSchema)