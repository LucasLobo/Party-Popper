export class Player {
  /*
    The ready state of the player
  */
  readonly ready: boolean = false;

  /*
    The current poisiton of the player
  */
  position: number;

  constructor() {
    this.position = 0;
  }
}
