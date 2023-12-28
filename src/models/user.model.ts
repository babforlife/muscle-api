import { model, Schema, Document } from 'mongoose'

export class User {
  id = ''
  email = ''

  constructor(fields: Partial<User> = {}) {
    Object.assign(this, fields)
  }
}

export interface IUser extends Document {
  _id: string
  email: string
  password: string
  repeatPassword?: string
}

export const UserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  email: { type: String },
  password: { type: String }
})

export const UserM = model<IUser>('users', UserSchema)