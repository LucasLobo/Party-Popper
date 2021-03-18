import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Game from "./components/game/Game";
import LandingPage from "./pages/landing/landingPage";
import JoinPage from "./pages/joinPage/joinPage";
import "./assets/variables.css";
import useAvatar from "./hooks/useAvatar";
import useBoard from "./hooks/useBoard";
import LobbyPage from "./pages/lobbyPage/lobbyPage";

const App: React.VFC = () => {
  const [nickname, setNickame] = useState("");
  const [avatar, nextAvatar] = useAvatar();
  const [code, setCode] = useState("");
  const [board, players, movePlayer] = useBoard();
  const [isOwner, setIsOwner] = useState(false);

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
            isOwner={isOwner}
            setIsOwner={setIsOwner}
          />
        </Route>
        <Route path="/join">
          <JoinPage
            nickname={nickname}
            avatar={avatar}
            gameCode={code}
            setGameCode={setCode}
            isOwner={isOwner}
            setIsOwner={setIsOwner}
          />
        </Route>
        <Route path="/lobby">
          <LobbyPage
            code={code}
            isOwner={isOwner}
            nickName={nickname}
            avatar={avatar}
            players={players}
          />
        </Route>
        <Route path="/game">
          <Game board={board} players={players} moveplayer={movePlayer} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
