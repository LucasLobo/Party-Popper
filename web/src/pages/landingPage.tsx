/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

import * as React from "react";
import { useHistory } from "react-router-dom";
import CircleAvatar from "../components/cirlceavatar/circleAvatar";
import Button from "../components/button/Button";
import Input from "../components/input/Input";
import "./landing.css";
import LandingContainer from "../containers/landingContainers/landingContainer";
import LandingBackground from "../containers/landingBackground/landingBackground";

interface Person {
  name?: string;
  age?: string;
}

const LandingPage: React.VFC = () => {
  const history = useHistory();
  return (
    <>
      <LandingBackground>
        <p className="header-text">Party Popper</p>
        <LandingContainer>
          <CircleAvatar url="https://garticphone.com/images/avatar/33.svg" />
          <Input
            placeholder="Nick Name"
            // value=""
            onChange={(_e) => {
              console.log("tre");
            }}
          />
          <Button
            label="start"
            onClick={() => {
              let result = "";
              const chars =
                "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
              for (let i = 9; i > 0; i--) {
                result += chars[Math.floor(Math.random() * chars.length)];
              }
              window.alert(`Your invite code is ${result}`);
              const path = `game`;
              history.push(path);
            }}
          />
        </LandingContainer>
      </LandingBackground>
    </>
  );
};

export default LandingPage;
