import { useEffect, useRef, useState } from "react";
import { Player } from "../models/player";
import { SocketType } from "../utils/constants";
import { socket } from "../utils/socket";

export function usePlayers(): Player[] {
  const [players, setPlayers] = useState<Player[] | null>(null);
  const socs = useRef<[] | null>(null);

  //   useEffect(() => {});

  setInterval(() => {
    console.log("interval");
    socket.on(SocketType.PLAYERS, (soc: any) => {
      console.log("number", soc);
      socs.current = soc;
      console.log(socs);
    });
  }, 100);

  //   const mapped = socs.current!.map((p: any) => {
  //     const pl = new Player(
  //       p.gameId,
  //       p.nickName,
  //       p.playerId,
  //       p.avatar,
  //       p.position
  //     );
  //     return pl;
  //   });

  //   setPlayers(mapped);
  //   console.log(mapped);

  return [];
}
