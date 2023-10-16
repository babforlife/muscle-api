import { model, Schema, Document } from 'mongoose'

export interface IExercise extends Document {
  _id: string;
  name: string;
}

export const ExerciseSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String },
})

export const Exercise = model<IExercise>('exercises', ExerciseSchema)