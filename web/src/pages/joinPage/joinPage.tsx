import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import CircleAvatar from "../../components/circleAvatar/circleAvatar";
import "./joinPage.css";
import LandingContainer from "../../containers/landingContainers/landingContainer";
import LandingBackground from "../../containers/landingBackground/landingBackground";

interface JoinProps {
  avatar: string;
  nickname: string;
  gameCode: string;
  setGameCode: Dispatch<SetStateAction<string>>;
  isOwner: boolean;
  setIsOwner: Dispatch<SetStateAction<boolean>>;
}

const JoinPage: React.VFC<JoinProps> = ({
  avatar,
  nickname,
  gameCode,
  setGameCode,
  isOwner,
  setIsOwner,
}) => {
  const history = useHistory();
  if (!nickname) {
    history.replace("/");
  }

  useEffect(() => {
    setGameCode("");
    setIsOwner(false);
  }, []);

  const joinRoom = () => {
    if (gameCode) {
      history.push("lobby");
    }
  };

  const back = () => {
    // setGameCode("");
    setIsOwner(false);
    history.goBack();
  };

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
          onClick={joinRoom}
        />
        <Button
          className="join-button"
          label="back"
          color="default"
          onClick={back}
        />
      </LandingContainer>
    </LandingBackground>
  );
};

export default JoinPage;
