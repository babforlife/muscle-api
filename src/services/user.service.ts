import { User } from '../models'

export class UserService {
  user = new User()

  setUser(user: User) {
    this.user = user
  }
}