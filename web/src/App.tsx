import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Game from "./components/game/Game";
import LandingPage from "./pages/landing/landingPage";
import JoinPage from "./pages/joinPage/joinPage";
import "./assets/variables.css";
import useAvatar from "./hooks/useAvatar";
import LobbyPage from "./pages/lobbyPage/lobbyPage";

const App: React.VFC = () => {
  const [nickname, setNickame] = useState("");
  const [avatar, nextAvatar] = useAvatar();
  const [code, setCode] = useState("");

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LandingPage
            nickname={nickname}
            setNickame={setNickame}
            avatar={avatar}
            nextAvatar={nextAvatar}
            setCode={setCode}
          />
        </Route>
        <Route path="/join">
          <JoinPage
            nickname={nickname}
            avatar={avatar}
            gameCode={code}
            setGameCode={setCode}
          />
        </Route>
        <Route path="/lobby">
          <LobbyPage code={code} nickName={nickname} avatar={avatar} />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
