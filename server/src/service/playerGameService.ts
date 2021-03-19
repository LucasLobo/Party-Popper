import { getRandomInt } from "../contants/random";
import { Player } from "src/models/player";
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

  /**
   * choosePerson
   */
  public choosePerson(players: Player[]): Player {
    const rand = getRandomInt(0, players.length - 1);
    return players[rand];
  }

  public movePlayer = (playerId: string, amount: number, players: Player[]) => {
    const player = players.find((element) => element.playerId === playerId);
    if (
      player === undefined ||
      player.position + amount >= this.gameState.board()
    )
      return false;

    const position = player.position + amount;
    player.position = position;
    return true;
  };
}
