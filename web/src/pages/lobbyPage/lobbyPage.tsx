import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./lobbyPage.css";
import LandingContainer from "../../containers/landingContainers/landingContainer";
import LandingBackground from "../../containers/landingBackground/landingBackground";
import Lobby from "../../components/lobby/Lobby";
import { SocketType } from "../../utils/constants";
import { socket } from "../../utils/socket";
import { Player } from "../../models/player";

interface LobbyPageProps {
  code: string;
  nickName: string;
  avatar: string;
  players: Player[];
  isOwner: boolean;
}

const LobbyPage: React.VFC<LobbyPageProps> = ({
  code,
  nickName,
  avatar,
  players,
  isOwner,
}) => {
  const history = useHistory();

  if (!code) {
    history.replace("/");
  }

  const start = () => {
    history.push("/game");
  };

  useEffect(() => {
    socket.connect();
    socket.emit(SocketType.JOINROOM, { nickName, code, avatar });
  }, []);

  return (
    <LandingBackground>
      <h1 className="header-text">Party Popper</h1>
      <LandingContainer>
        <Lobby code={code} start={start} players={players} isOwner={isOwner} />
      </LandingContainer>
    </LandingBackground>
  );
};

export default LobbyPage;
