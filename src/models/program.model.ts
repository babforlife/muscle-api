import { IExercise } from '.';
import { model, Schema, Document } from 'mongoose'

export interface IProgram extends Document {
  _id?: string;
  userId: string;
  color: number;
  name: string;
  exercises: IExercise[];
}

export const ProgramsSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  color: { type: Number },
  name: { type: String },
  exercises: [{ type: Schema.Types.ObjectId, ref: 'exercises' }],
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
})

export const Program = model<IProgram>('programs', ProgramsSchema)