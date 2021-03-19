import React, { useEffect, useState } from "react";
import "./Game.css";

import Header from "../header/Header";
import Board from "./board/Board";
import Challenge from "./challenge/Challenge";
import Dice from "./dice/Dice";
import { IBoard } from "../../hooks/useBoard";
import { Player } from "../../models/player";
import { socket } from "../../utils/socket";

interface GameProps {
  players: Player[];
  board: IBoard;
  currentPlayerId: string;
  code: string;
  moveplayer: (id: string, amount: number) => boolean;
}

const Game: React.VFC<GameProps> = ({
  players,
  board,
  moveplayer,
  currentPlayerId,
  code,
}) => {
  const description =
    "Never have I ever used a fake ID to get into a party or buy drinks";
  const outcome = "Take 2 sips if you have";

  const [isChallenge, setIsChallenge] = useState<boolean>(false);
  const [isDice, setIsDice] = useState<boolean>(false);

  const processDiceResult: (amount: number) => void = (amount) => {
    socket.emit("updateposition", {
      playerId: currentPlayerId,
      amount,
      code,
    });
    console.log(code, "board.code");
    setIsDice(false);
  };

  const nextPlayer: () => void = () => {
    socket.emit("chooseplayer", { code });
    setIsChallenge(false);
  };
  const doSomething: () => void = () => {
    moveplayer(players[0].playerId, 1);
  };

  useEffect(() => {
    socket.on("chooseplayer", (player: any) => {
      console.table(player.playerId);
      if (player.playerId === currentPlayerId) {
        setIsDice(true);
      } else {
        console.table(`${player}`);
      }
    });

    socket.on("positionupdated", (playerId: any) => {
      console.log("positionupdated", playerId);
      if (currentPlayerId === playerId) {
        setIsChallenge(true);
      }
    });
  }, []);

  return (
    <div className="game-container">
      <div
        className={`game ${
          isChallenge || isDice ? "game challenge-active" : ""
        }`}
      >
        <Header color="default" title="Hello" secondary="bye" />
        <Board fields={board.fields} />

        <div className="temp-button-container">
          <button type="button" onClick={doSomething} className="temp-button">
            Log players
          </button>

          <button
            type="button"
            onClick={() => {
              setIsChallenge(true);
            }}
            className="temp-button"
          >
            Open Challenge
          </button>

          <button
            type="button"
            onClick={() => {
              setIsDice(true);
            }}
            className="temp-button"
          >
            Roll Dice
          </button>
        </div>
      </div>

      {(isChallenge || isDice) && (
        <div className="overlay-container">
          {isChallenge && (
            <Challenge
              description={description}
              outcome={outcome}
              color="green"
              onClose={nextPlayer}
              title="never have i ever"
            />
          )}
          {isDice && <Dice resultCallback={processDiceResult} />}
        </div>
      )}
    </div>
  );
};

export default Game;
