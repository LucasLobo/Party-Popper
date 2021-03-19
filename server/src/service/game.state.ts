import { Field } from "src/models/field";
import { Player } from "src/models/player";

interface IGameState {
  players: Player[];
  boards: Map<string, Field[]>;
}

export class GameState {
  private gameState: IGameState;

  private static _instance: GameState;

  constructor() {
    this.gameState = {
      players: [],
      boards: new Map(),
    };
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  /**
   * board
   */

  public board(code: string): Field[] {
    if (!this.gameState.boards.get(`${code}`)) {
      throw Error(`board() : ${code} undefined`);
    }
    return this.gameState.boards.get(`${code}`)!;
  }

  public getGamePlayers(gameId: string): Player[] {
    const filteredPlayers = [];

    const { players } = this.gameState;
    for (let i = 0; i < players.length; i += 1) {
      if (players[i].gameId === gameId) {
        filteredPlayers.push(players[i]);
      }
    }
    return filteredPlayers;
  }

  public updateBoard(code: string, fields: Field[]) {
    this.gameState.boards.set(code, fields);
    console.log("board fields", this.gameState.boards);
  }

  public joinPlayer(player: Player) {
    let pl = this.gameState.players;
    let present = false;
    pl.forEach((p) => {
      if (p.playerId === player.playerId) {
        present = true;
      }
    });

    if (!present) this.gameState.players.push(player);
  }

  public disconnectplayer(playerId: string): Player[] {
    const players = this.gameState.players.filter(
      (p) => p.playerId != playerId
    );

    return (this.gameState.players = players);
  }

  public updatePLayerPosition(position: number, playerId: string): void {
    this.gameState.players.map((p) => {
      if (p.playerId == playerId) {
        p.position = position;
      }
    });
  }

  public makePlayerReady(playerId: string, players: Player[]): Player[] {
    const pls = players.map((p) => {
      if (p.playerId === playerId) {
        if (p.ready) {
          // console.log(playerId, "working");
          p.ready = false;
        } else {
          p.ready = true;
        }
      }
      return p;
    });
    return pls;
  }
}
