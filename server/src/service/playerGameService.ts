import { getRandomInt } from "../contants/random";
import { Player } from "../models/player";
import { GameState } from "./game.state";
import { Field } from "../models/field";
import { categories, colors } from "../contants/constant";

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

  public movePlayer = (
    playerId: string,
    amount: number,
    players: Player[],
    code: string
  ) => {
    const player = players.find((element) => element.playerId === playerId);
    if (
      player === undefined ||
      player.position + amount >= this.gameState.board(code).length
    ) {
      return -1;
    }

    const position = player.position + amount;
    player.position = position;
    return position;
  };

  public generateboard(length: number = 25): Field[] {
    const board: Field[] = [];
    const start = new Field(0, "green", "start");
    board.push(start);
    const finish = new Field(length, "finish", "finish");
    for (let i = 1; i < length; i += 1) {
      const colorIndex = getRandomInt(0, colors.length - 1);
      const categoryIndex = getRandomInt(0, categories.length - 1);
      const field = new Field(i, colors[colorIndex], categories[categoryIndex]);
      board.push(field);
    }
    board.push(finish);
    return board;
  }
}
