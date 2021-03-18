export class Player {
  /**
    The ready state of the player
  */
  ready: boolean = false;

  /**
    The current poisiton of the player
  */
  position: number;
  /**
    The current room the player is in
  */
  gameId: string;

  /**
    The display Name of the player
  */
  nickName: string;

  /**
    The socketId of the player
  */
  playerId: string;

  /**
    The Avatar of the player
  */
  avatar: string;

  constructor(
    gameId: string,
    nickName: string,
    playerId: string,
    avatar: string,
    position?: number
  ) {
    this.position = position ?? 0;
    this.gameId = gameId;
    this.nickName = nickName;
    this.playerId = playerId;
    this.avatar = avatar;
  }
}
