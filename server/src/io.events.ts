import { Server, Socket } from "socket.io";
import { SockeType } from "./contants/constant";
import { GameState } from "./service/game.state";
import { ConnectionService } from "./service/connection.service";
import { PlayGameService } from "./service/playeGameService";

export class IoEvents {
  /**
    An instance of the current Seerver
  */
  private io: Server;
  /**
    The current socket being acccessed
  */
  private socket: Socket;

  gameState: GameState;

  constructor(io: Server, socket: Socket) {
    this.io = io;
    this.socket = socket;

    this.gameState = GameState.Instance;

    const connectUser = new ConnectionService();
    const playGame = new PlayGameService();

    this.io.on(
      SockeType.DISCONNECTION,
      (socket: Socket, { nickName, gameId }) => {
        connectUser.leaveGame(socket.id);
        socket.broadcast
          .to(gameId)
          .emit(SockeType.NOTIFICATION, `${nickName} has left the game`);
      }
    );

    // this.io.on(SockeType.CONNECTION, (socket: Socket) => {
    this.socket.on(
      SockeType.JOINROOM,
      ({ nickName, code, avatar, playerId }) => {
        if (code || nickName || avatar) {
          connectUser.joinGame(code, nickName, playerId, avatar);

          this.socket.join(code);
          console.log(nickName, socket.id, code, avatar);
          const players = this.gameState.getGamePlayers(code);

          this.io.to(code).emit(SockeType.JOINROOM, players);

          this.socket.broadcast
            .to(code)
            .emit(SockeType.NOTIFICATION, `${nickName} has joined the game`);
        }
      }
    );

    this.io.on(SockeType.POSITION, ({ position, playerId }) => {
      playGame.updatePosition(position, playerId);
    });

    this.socket.on(SockeType.READY, (e) => {
      if (e.playerId) {
        const p = this.gameState.makePlayerReady(e.playerId);
        console.log(e.playerId);
        this.io.to(e.code).emit(SockeType.JOINROOM, p);
      }
    });
  }
}
