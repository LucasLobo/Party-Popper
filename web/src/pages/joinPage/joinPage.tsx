import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import CircleAvatar from "../../components/circleAvatar/circleAvatar";
import "./joinPage.css";
import LandingContainer from "../../containers/landingContainers/landingContainer";
import LandingBackground from "../../containers/landingBackground/landingBackground";

const JoinPage: React.VFC = () => {
  const [gameCode, setGameCode] = useState("");
  const history = useHistory();
  const avatar = "fox";
  const nickname = "John";

  return (
    <LandingBackground>
      <h1 className="header-text">Party Popper</h1>
      <LandingContainer>
        <div className="join-avatar-container">
          <CircleAvatar name={avatar} />
        </div>
        <p className="joinpage-nickname">{nickname}</p>

        <Input
          className="join-input"
          placeholder="game code"
          color="light"
          value={gameCode}
          onChange={(_e) => {
            setGameCode(_e.target.value);
          }}
        />
        <Button
          className="join-button"
          label="Join"
          color="green"
          onClick={() => {
            console.log("something");
            const path = `game`;
            history.push(path);
          }}
        />
        <Button
          className="join-button"
          label="back"
          color="default"
          onClick={() => {
            console.log("back");
            const path = `/`;
            history.push(path);
          }}
        />
      </LandingContainer>
    </LandingBackground>
  );
};

export default JoinPage;
