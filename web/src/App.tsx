import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Game from "./components/game/Game";
import LandingPage from "./pages/landing/landingPage";
import JoinPage from "./pages/joinPage/joinPage";
import "./assets/variables.css";
import avatars from "./assets/avatars";

// import "./assets";
const randIndex: () => number = () => {
  const min = 0;
  const max = avatars.length - 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const App = () => {
  const [nickname, setNickame] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(randIndex());
  const [code, setGenerateCode] = useState("");

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LandingPage
              nickname={nickname}
              setNickame={setNickame}
              avatarIndex={avatarIndex}
              setAvatarIndex={setAvatarIndex}
              setGenerateCode={setGenerateCode}
            />
          </Route>
          <Route path="/join">
            <JoinPage
              nickname={nickname}
              avatar={avatars[avatarIndex]}
              gameCode={code}
              setGameCode={setGenerateCode}
            />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
