import React, { useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import CircleAvatar from "../../components/circleAvatar/circleAvatar";
import "./joinPage.css";
import LandingContainer from "../../containers/landingContainers/landingContainer";
import LandingBackground from "../../containers/landingBackground/landingBackground";

const JoinPage: React.VFC = () => {
  const [gameCode, setGameCode] = useState("");
  const avatar = "fox";
  const nickname = "John";

  return (
    <LandingBackground>
      <h1 className="header-text">Party Popper</h1>
      <LandingContainer>
        <div className="landing-avatar-container">
          <CircleAvatar name={avatar} />
        </div>
        <p className="joinpage-nickname">{nickname}</p>

        <Input
          className="landing-input"
          placeholder="game code"
          color="light"
          value={gameCode}
          onChange={(_e) => {
            setGameCode(_e.target.value);
          }}
        />
        <Button
          className="landing-button"
          label="Join"
          color="green"
          onClick={() => {
            console.log("something");
          }}
        />
        <Button
          className="landing-button"
          label="back"
          color="default"
          onClick={() => {
            console.log("back");
          }}
        />
      </LandingContainer>
    </LandingBackground>
  );
};

export default JoinPage;
