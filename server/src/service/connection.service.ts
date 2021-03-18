
import { Player } from "../models/player";
import { GameState } from "./game.state";

export class ConnectionService {
  gameState: GameState;

  constructor() {
    this.gameState = GameState.Instance;
  }

  public joinGame(gameId: string, nickName: string, id: string, img: string) {
    var player = new Player(gameId, nickName, id, img);
    this.gameState.joinPlayer(player);
  }

  public leaveGame(playerId: string): void {
    this.gameState.disconnectplayer(playerId);
  }
}
