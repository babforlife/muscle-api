import { model, Schema, Document } from 'mongoose'

export interface ISession extends Document {
  _id?: string;
  name: string;
}

export const SessionSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String },
})

export const Session = model<ISession>('sessions', SessionSchema)