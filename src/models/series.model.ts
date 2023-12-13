export class Series {
  repetitions = 0
  weight = 0

  constructor(field: Partial<Series> = {}) {
    Object.assign(this, field)
  }
}