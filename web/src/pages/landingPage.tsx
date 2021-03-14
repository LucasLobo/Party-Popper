import * as React from "react";
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
  return (
    <>
      <LandingBackground>
        <p className="header-text">Party Popper</p>
        <LandingContainer>
          <CircleAvatar url="https://garticphone.com/images/avatar/33.svg" />
          <Input placeholder="Nick Name" value="" onChange={(_e) => {}} />
          <Button label="start" onClick={() => console.log("yo")} />
        </LandingContainer>
      </LandingBackground>
    </>
  );
};

export default LandingPage;
