import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import socketIOClient, { Socket } from "socket.io-client";

import "./lobbyPage.css";
import LandingContainer from "../../containers/landingContainers/landingContainer";
import LandingBackground from "../../containers/landingBackground/landingBackground";
import Lobby from "../../components/lobby/Lobby";
import { SocketType } from "../../utils/constants";
import { socket } from "../../utils/socket";
import { usePlayers } from "../../hooks/usePlayers";

interface LobbyPageProps {
  code: string;
  nickName: string;
  avatar: string;
}
type Players = {
  players: [];
};

const LobbyPage: React.VFC<LobbyPageProps> = ({ code, nickName, avatar }) => {
  const history = useHistory();
  const [message, setmessage] = useState<string>("");

  if (!code) {
    history.replace("/");
  }

  const start = () => {
    history.push("/game");
  };

  useEffect(() => {
    socket.connect();

    socket.emit(SocketType.JOINROOM, { nickName, code, avatar });

    socket.on(SocketType.NOTIFICATION, (msg: any) => {
      console.log("hello", msg);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   setInterval(() => {}, 100);
  // }, []);

  return (
    <LandingBackground>
      <h1 className="header-text">Party Popper</h1>
      <LandingContainer>
        <Lobby code={code} start={start} />
      </LandingContainer>
    </LandingBackground>
  );
};

export default LobbyPage;
