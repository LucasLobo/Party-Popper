import React, { Dispatch, SetStateAction } from "react";
import { useHistory } from "react-router-dom";
import CircleAvatar from "../../components/circleAvatar/circleAvatar";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./landingPage.css";
import LandingContainer from "../../containers/landingContainers/landingContainer";
import LandingBackground from "../../containers/landingBackground/landingBackground";

interface LandingProps {
  nickname: string;
  avatar: string;
  setNickame: Dispatch<SetStateAction<string>>;
  nextAvatar: Dispatch<SetStateAction<void>>;
  setCode: Dispatch<SetStateAction<string>>;
}

const LandingPage: React.VFC<LandingProps> = ({
  nickname,
  setNickame,
  avatar,
  nextAvatar,
  setCode,
}) => {
  const history = useHistory();

  const generateCode: () => string = () => {
    let code = "";
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 9; i > 0; i -= 1) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCode(code);
    return code;
  };

  const createRoom = () => {
    if (nickname) {
      generateCode();
      history.push("lobby");
    }
  };

  const joinRoom = () => {
    if (nickname) history.push("join");
  };

  return (
    <LandingBackground>
      <h1 className="header-text">Party Popper</h1>
      <LandingContainer>
        <div className="landing-avatar-container">
          <CircleAvatar name={avatar} onReload={nextAvatar} />
        </div>
        <Input
          className="landing-input"
          placeholder="Nickname"
          color="light"
          value={nickname}
          onChange={(_e) => {
            setNickame(_e.target.value);
          }}
        />
        <Button
          className="landing-button"
          label="Join existing Room"
          color="green"
          onClick={joinRoom}
        />
        <Button
          className="landing-button"
          label="Create new Room"
          color="default"
          onClick={createRoom}
        />
      </LandingContainer>
    </LandingBackground>
  );
};

export default LandingPage;
