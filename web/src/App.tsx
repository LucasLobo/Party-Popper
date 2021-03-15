import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Game from "./components/game/Game";
import LandingPage from "./pages/landing/landingPage";
import JoinPage from "./pages/joinPage/joinPage";
import "./assets/variables.css";
import useAvatar from "./hooks/useAvatar";

const App = () => {
  const [nickname, setNickame] = useState("");
  const [avatar, nextAvatar] = useAvatar();
  const [code, setGenerateCode] = useState("");

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LandingPage
              nickname={nickname}
              setNickame={setNickame}
              avatar={avatar}
              nextAvatar={nextAvatar}
              setGenerateCode={setGenerateCode}
            />
          </Route>
          <Route path="/join">
            <JoinPage
              nickname={nickname}
              avatar={avatar}
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
