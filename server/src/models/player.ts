export class Player {
  /**
    The ready state of the player
  */
  readonly ready: boolean = false;

  /**
    The current poisiton of the player
  */
  position: number;
  /**
    The current poisiton of the player
  */
  gameId: string;

  constructor(position: number, gameId: string) {
    this.position = position ?? 0;
    this.gameId = gameId;
  }
}
