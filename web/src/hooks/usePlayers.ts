import { useEffect, useState } from "react";
import { Player } from "../models/player";
import { SocketType } from "../utils/constants";
import { socket } from "../utils/socket";

export function usePlayers(): Player[] {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    socket.on(SocketType.JOINROOM, (soc: any) => {
      const pl = soc.map((p: any) => {
        return new Player(
          p.gameId,
          p.nickName,
          p.ready,
          p.playerId,
          p.avatar,
          p.position
        );
      });
      setPlayers(pl);
    });
  }, []);

  return players;
}
