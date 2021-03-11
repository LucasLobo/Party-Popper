import { Game } from "src/models/game";
import { Player } from "src/models/player";

interface IGameState {
  players?: Player[] | null;
  game?: Game | null;
}

export class GameState {
  private gameState: IGameState;

  constructor() {
    this.gameState = {
      players: null,
      game: null,
    };
  }

  public getGameState(): IGameState {
    return this.gameState;
  }
}
