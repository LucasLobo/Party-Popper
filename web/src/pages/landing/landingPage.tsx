import React, { useState } from "react";
import CircleAvatar from "../../components/circleAvatar/circleAvatar";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./landingPage.css";
import LandingContainer from "../../containers/landingContainers/landingContainer";
import LandingBackground from "../../containers/landingBackground/landingBackground";

const avatars = [
  "bat",
  "beaver",
  "bee",
  "beetle",
  "boar",
  "buffalo",
  "bullfinch",
  "butterfly",
  "camel",
  "cat",
  "chameleon",
  "chicken",
  "clownfish",
  "cow",
  "crab",
  "crocodile",
  "deer",
  "dog",
  "elephant",
  "flamingo",
  "fox",
  "frog",
  "giraffe",
  "gorilla",
  "hedgehog",
  "hippo",
  "horse",
  "ladybug",
  "lama",
  "lion",
  "mouse",
  "owl",
  "panda",
  "parrot",
  "penguin",
  "pig",
  "platypus",
  "rabbit",
  "rhino",
  "shark",
  "sheep",
  "sloth",
  "snake",
  "spider",
  "squid",
  "stingray",
  "turtle",
  "walrus",
  "whale",
  "zebra",
];

interface Person {
  name?: string;
  age?: string;
}

const generateCode: () => string = () => {
  let code = "";
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 9; i > 0; i -= 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

const randIndex: () => number = () => {
  const min = 0;
  const max = avatars.length - 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const LandingPage: React.VFC = () => {
  const [nickname, setNickame] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(randIndex());

  const nextIndex = () => {
    setAvatarIndex((avatarIndex + 1) % avatars.length);
  };

  return (
    <LandingBackground>
      <h1 className="header-text">Party Popper</h1>
      <LandingContainer>
        <div className="landing-avatar-container">
          <CircleAvatar name={avatars[avatarIndex]} onReload={nextIndex} />
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
          onClick={() => {
            console.log("something");
          }}
        />
        <Button
          className="landing-button"
          label="Create new Room"
          color="default"
          onClick={() => {
            window.alert(`Your invite code is ${generateCode()}`);
          }}
        />
      </LandingContainer>
    </LandingBackground>
  );
};

export default LandingPage;
