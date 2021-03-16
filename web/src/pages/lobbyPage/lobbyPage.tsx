import React from "react";
import { useHistory } from "react-router-dom";
import "./lobbyPage.css";
import LandingContainer from "../../containers/landingContainers/landingContainer";
import LandingBackground from "../../containers/landingBackground/landingBackground";
import Lobby from "../../components/lobby/Lobby";

interface LobbyPageProps {
  code: string;
}

const LobbyPage: React.VFC<LobbyPageProps> = ({ code }) => {
  const history = useHistory();
  if (!code) {
    history.replace("/");
  }

  const start = () => {
    history.push("/game");
  };

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
