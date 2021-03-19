import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./lobbyPage.css";
import LandingContainer from "../../containers/landingContainers/landingContainer";
import LandingBackground from "../../containers/landingBackground/landingBackground";
import Lobby from "../../components/lobby/Lobby";
import { SocketType } from "../../utils/constants";
import { socket } from "../../utils/socket";
import { Player } from "../../models/player";
import { IField } from "../../hooks/useBoard";

interface LobbyPageProps {
  code: string;
  nickName: string;
  avatar: string;
  players: Player[];
  isOwner: boolean;
  playerId: string;
  makeBoard: (fields: IField[]) => void;
}

const LobbyPage: React.VFC<LobbyPageProps> = ({
  code,
  nickName,
  avatar,
  players,
  isOwner,
  playerId,
  makeBoard,
}) => {
  const history = useHistory();

  if (!code) {
    history.replace("/");
  }

  const start = () => {
    socket.emit(SocketType.GAMEINITIALISED, { code });
    history.push("/game");
  };

  socket.on(SocketType.GAMESTARTED, (arg: any) => {
    history.push("/game");
  });

  useEffect(() => {
    socket.connect();
    socket.emit(SocketType.JOINROOM, { playerId, nickName, code, avatar });
    socket.emit("requestboard", { code });

    socket.on("requestboard", ({ board }: any) => {
      makeBoard(board);
    });
  }, []);

  return (
    <LandingBackground>
      <h1 className="header-text">Party Popper</h1>
      <LandingContainer>
        <Lobby
          code={code}
          start={start}
          players={players}
          isOwner={isOwner}
          playerId={playerId}
        />
      </LandingContainer>
    </LandingBackground>
  );
};

export default LobbyPage;
