import { IUser, UserM } from '../models';
import { genSaltSync, hashSync, compareSync } from "bcrypt";

export const AuthenticationService = {
  async add (user: IUser): Promise<IUser> {
    user.email = user.email.toLowerCase()
    if (user.email === '') throw new Error('Veuillez entrer une adresse mail.')
    if (user.password === '') throw new Error('Veuillez entrer un mot de passe.')
    if (user.repeatPassword === '') throw new Error('Veuillez confirmer votre mot de passe.')
    if (user.password !== user.repeatPassword) throw new Error('Les mots de passes ne correspondent pas.')
    if (!this.validateEmail(user.email)) throw new Error('L\'adresse mail n\'est pas valide.')
    if (await UserM.findOne({ email: user.email })) throw new Error('L\'email existe déjà.')
    return await UserM.create({email: user.email, password: this.hashPassword(user.password)} as IUser)
  },
  hashPassword (password: string): string {
    const saltRounds = 10
    const salt = genSaltSync(saltRounds)
    const hash = hashSync(password, salt)
    return hash
  },
  async login (email: string, password: string): Promise<IUser> {
    const user = await UserM.findOne({ email })
    const match = user && compareSync(password, user.password)
    if (!user || !match) throw new Error('Invalid email or password')
    return user
  },
  // http://emailregex.com/
  validateEmail (email: string): boolean {
    const regex = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/
    return email.match(regex) !== null ? true : false
  },
}