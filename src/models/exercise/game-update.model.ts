import { Player } from './../player.model';
export class GameDto {
  _id = ''
  players: Player[] = []

  constructor (data: Partial<GameDto> = {}) {
    Object.assign(this, data)
    console.log('data', data)
    if(data.players) this.players = data.players.map(player => new Player(player))
  }
}
