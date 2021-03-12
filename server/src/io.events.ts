import { Server, Socket } from "socket.io";
import { SockeType } from "./contants/constant";

export class IoEvents {
  /**
    An instance of the current Seerver
  */
  private io: Server;
  /**
    The current socket being acccessed
  */
  private socket: Socket;

  constructor(io: Server, socket: Socket) {
    this.io = io;
    this.socket = socket;

    this.socket.on(SockeType.DISCONNECTION, () => {
      io.emit("Disconnecting");
    });
  }
}
