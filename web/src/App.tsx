import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Game from "./components/game/Game";
import LandingPage from "./pages/landing/landingPage";
import JoinPage from "./pages/joinPage/joinPage";
import "./assets/variables.css";
import useAvatar from "./hooks/useAvatar";
import useBoard from "./hooks/useBoard";
import LobbyPage from "./pages/lobbyPage/lobbyPage";
import { generateCode } from "./utils/generate";
import { socket } from "./utils/socket";
import { SocketType } from "./utils/constants";

const App: React.VFC = () => {
  const [nickname, setNickame] = useState("");
  const [avatar, nextAvatar] = useAvatar();
  const [code, setCode] = useState("");
  const [board, players, makeBoard] = useBoard();
  const [isOwner, setIsOwner] = useState(false);
  const [playerId, setPlayerId] = useState("");

  const alertUser = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };
  const handleDisconnect = () => {
    socket.emit(SocketType.LEAVING, { playerId, code });
    socket.disconnect();
  };

  useEffect(() => {
    const pid = generateCode();
    setPlayerId(pid);
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    window.addEventListener("unload", handleDisconnect);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
      window.removeEventListener("unload", handleDisconnect);
      handleDisconnect();
    };
  }, []);

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
            setPlayerId={setPlayerId}
          />
        </Route>
        <Route path="/join">
          <JoinPage
            nickname={nickname}
            avatar={avatar}
            gameCode={code}
            setGameCode={setCode}
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
            playerId={playerId}
            makeBoard={makeBoard}
          />
        </Route>
        <Route path="/game">
          <Game
            board={board}
            currentPlayerId={playerId}
            players={players}
            code={code}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
