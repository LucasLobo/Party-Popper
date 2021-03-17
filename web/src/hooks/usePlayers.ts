import { useEffect, useRef, useState } from "react";
import { Player } from "../models/player";
import { SocketType } from "../utils/constants";
import { socket } from "../utils/socket";

export function usePlayers(cb?: () => void): Player[] {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    socket.on(SocketType.JOINROOM, (soc: any) => {
      console.log("number", soc);

      const pl = soc.map((p: any) => {
        return new Player(
          p.gameId,
          p.nickName,
          p.playerId,
          p.avatar,
          p.position
        );
      });
      setPlayers(pl);
      cb?.();
    });
  }, []);

  return players;
}
