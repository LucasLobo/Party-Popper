import * as React from "react";
import CircleAvatar from "../components/circleavatar/circleAvatar";
import Input from "../components/input/Input";
import "./landing.css";
import LandingContainer from "../containers/landingContainers/landingContainer";
import LandingBackground from "../containers/landingBackground/landingBackground";


interface Person{
  name?: string;
  age?: string;

}

const LandingPage: React.VFC = () => {

  return (
    <>
      <LandingBackground>
        <p className="header-text">Party Popper</p>
        <LandingContainer>
          <CircleAvatar />
          <Input placeholder="Nick Name" value="" onChange={(_e) => {}} />Î
        </LandingContainer>
      </LandingBackground>
    </>
  );
};

export default LandingPage;
