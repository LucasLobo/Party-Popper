import React, { Dispatch, SetStateAction } from "react";
import { useHistory } from "react-router-dom";
import CircleAvatar from "../../components/circleAvatar/circleAvatar";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./landingPage.css";
import LandingContainer from "../../containers/landingContainers/landingContainer";
import LandingBackground from "../../containers/landingBackground/landingBackground";
import avatars from "../../assets/avatars";

interface LandingProps {
  nickname: string;
  avatarIndex: number;
  setNickame: Dispatch<SetStateAction<string>>;
  setAvatarIndex: Dispatch<SetStateAction<number>>;
  setGenerateCode: Dispatch<SetStateAction<string>>;
}

const LandingPage: React.VFC<LandingProps> = ({
  nickname,
  setNickame,
  avatarIndex,
  setAvatarIndex,
  setGenerateCode,
}) => {
  const generateCode: () => string = () => {
    let code = "";
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 9; i > 0; i -= 1) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setGenerateCode(code);
    return code;
  };

  const history = useHistory();
  const nextIndex = () => {
    setAvatarIndex((avatarIndex + 1) % avatars.length);
  };

  return (
    <LandingBackground>
      <h1 className="header-text">Party Popper</h1>
      <LandingContainer>
        <CircleAvatar name={avatars[avatarIndex]} onReload={nextIndex} />
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
          onClick={() => {
            console.log(nickname);
            const path = `join`;
            history.push(path);
          }}
        />
        <Button
          className="landing-button"
          label="Create new Room"
          color="default"
          onClick={() => {
            generateCode();
            const path = `join`;
            history.push(path);
          }}
        />
      </LandingContainer>
    </LandingBackground>
  );
};

export default LandingPage;
