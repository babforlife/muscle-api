export class Environment {
  production = true
  dbUri= 'uri db'
  apiUrl = ''
  port = '3000'

  constructor (data: Partial<Environment>) {
    Object.assign(this, data)
  }
}
