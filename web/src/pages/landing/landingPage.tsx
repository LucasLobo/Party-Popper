import React, { Dispatch, SetStateAction } from "react";
import { useHistory } from "react-router-dom";
import CircleAvatar from "../../components/circleAvatar/circleAvatar";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./landingPage.css";
import LandingContainer from "../../containers/landingContainers/landingContainer";
import LandingBackground from "../../containers/landingBackground/landingBackground";
import { generateCode } from "../../utils/generate";

interface LandingProps {
  nickname: string;
  avatar: string;
  setNickame: Dispatch<SetStateAction<string>>;
  nextAvatar: Dispatch<SetStateAction<void>>;
  setCode: Dispatch<SetStateAction<string>>;
  isOwner: boolean;
  setIsOwner: Dispatch<SetStateAction<boolean>>;
  setPlayerId: Dispatch<SetStateAction<string>>;
}

const LandingPage: React.VFC<LandingProps> = ({
  nickname,
  setNickame,
  avatar,
  nextAvatar,
  setCode,
  setIsOwner,
  setPlayerId,
}) => {
  const history = useHistory();

  const createRoom = () => {
    if (nickname) {
      const code = generateCode();
      const playerId = generateCode();
      setPlayerId(playerId);
      setCode(code);
      history.push("lobby");
      setIsOwner(true);
    }
  };

  const joinRoom = () => {
    if (nickname) history.push("join");
    const playerId = generateCode();
    setPlayerId(playerId);
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
