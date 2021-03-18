import { Game } from "src/models/game";
import { Player } from "src/models/player";

interface IGameState {
  players: Player[];
  game?: Game | null;
}

export class GameState {
  private gameState: IGameState;

  private static _instance: GameState;

  constructor() {
    this.gameState = {
      players: [],
      game: null,
    };
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  // public getGameState(): IGameState {
  //   return this.gameState;
  // }

  public getGamePlayers(gameId: string): Player[] {
    const players = this.gameState.players.filter(
      (player) => player.gameId == gameId
    );
    return players;
  }

  public joinPlayer(player: Player) {
    let pl = this.gameState.players;
    let present = false;
    pl.forEach((p) => {
      if (p.playerId == player.playerId) {
        present = true;
      }
    });

    if (!present) this.gameState.players.push(player);

    console.log(this.gameState.players);
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

  public makePlayerReady(playerId: string): Player[] {
    const pls = this.gameState.players.map((p) => {
      if (p.playerId == playerId) {
        if (p.ready) {
          console.log(playerId, "working");
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
