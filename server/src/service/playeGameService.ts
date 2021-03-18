import { GameState } from "./game.state";

export class PlayGameService {
  gameState: GameState;

  constructor() {
    this.gameState = GameState.Instance;
  }

  /**
   * updatePosition
   */
  public updatePosition(position: number, playerId: string) {
    this.gameState.updatePLayerPosition(position, playerId);
  }
}
