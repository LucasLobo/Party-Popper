import React from "react";
import "./lobbyPage.css";
import LandingContainer from "../../containers/landingContainers/landingContainer";
import LandingBackground from "../../containers/landingBackground/landingBackground";
import Lobby from "../../components/lobby/Lobby";

const LobbyPage: React.VFC = () => {
  return (
    <LandingBackground>
      <h1 className="header-text">Party Popper</h1>
      <LandingContainer>
        <Lobby />
      </LandingContainer>
    </LandingBackground>
  );
};

export default LobbyPage;
