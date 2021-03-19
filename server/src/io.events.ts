import { Server, Socket } from "socket.io";
import { SockeType } from "./contants/constant";
import { GameState } from "./service/game.state";
import { ConnectionService } from "./service/connection.service";
import { PlayGameService } from "./service/playerGameService";

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

    this.socket.on(
      SockeType.DISCONNECTION,
      (socket: Socket, { nickName, gameId }) => {
        console.log("Disconnecting");
        // connectUser.leaveGame(socket.id);
        // socket.broadcast
        //   .to(gameId)
        //   .emit(SockeType.NOTIFICATION, `${nickName} has left the game`);
      }
    );

    this.socket.on(SockeType.LEAVING, ({ playerId, code }) => {
      // console.log(playerId, code, "working");
      const p = connectUser.leaveGame(playerId);

      this.io.to(code).emit(SockeType.JOINROOM, p);
    });

    this.socket.on(
      SockeType.JOINROOM,
      ({ nickName, code, avatar, playerId }) => {
        if (code || nickName || avatar) {
          console.log("JOINROOM", nickName, code, avatar, playerId);
          connectUser.joinGame(code, nickName, playerId, avatar);

          this.socket.join(code);
          const players = this.gameState.getGamePlayers(code);

          this.io.to(code).emit(SockeType.JOINROOM, players);

          this.socket.broadcast
            .to(code)
            .emit(SockeType.NOTIFICATION, `${nickName} has joined the game`);
        }
      }
    );

    // this.io.on(SockeType.POSITION, ({ position, playerId }) => {
    //   playGame.updatePosition(position, playerId);
    // });

    this.socket.on(SockeType.READY, (e) => {
      if (e.playerId) {
        console.log("READY", e.playerId);
        const players = this.gameState.getGamePlayers(e.code);
        const p = this.gameState.makePlayerReady(e.playerId, players);
        this.io.to(e.code).emit(SockeType.JOINROOM, p);
      }
    });

    this.socket.on(SockeType.GAMEINITIALISED, ({ code }) => {
      if (code) {
        console.log("GAMEINITIALISED", code);

        this.socket.broadcast
          .to(code)
          .emit(SockeType.GAMESTARTED, `${code} has started`);

        const players = this.gameState.getGamePlayers(code);
        const pls = playGame.choosePerson(players);
        this.io.to(code).emit("chooseplayer", pls);
        console.log("chooseplayer", pls);
      }
    });

    this.socket.on("updateposition", ({ playerId, amount, code }) => {
      console.log("UPDATEPOSITION", playerId, code, amount);
      const players = this.gameState.getGamePlayers(code);

      const position = playGame.movePlayer(playerId, amount, players, code);

      this.io.to(code).emit(SockeType.JOINROOM, players);
      this.io.to(code).emit("positionupdated", {playerId, position});
    });

    this.socket.on("chooseplayer", ({ code }) => {
      console.log("CHOOSEPLAYER", code);
      const players = this.gameState.getGamePlayers(code);
      const pls = playGame.choosePerson(players);
      this.io.to(code).emit("chooseplayer", pls);
    });

    this.socket.on("creategame", ({ code }) => {
      console.log("creategame", code);
      const board = playGame.generateboard();
      this.gameState.updateBoard(code, board);
    });

    this.socket.on("requestboard", ({ code }) => {
      const board = this.gameState.board(code);
      this.io.to(code).emit("requestboard", { board });
    });
  }
}
