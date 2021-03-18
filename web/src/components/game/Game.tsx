import React, { useState } from "react";
import "./Game.css";

import Header from "../header/Header";
import Board from "./board/Board";
import Challenge from "./challenge/Challenge";
import Dice from "./dice/Dice";
import { IBoard } from "../../hooks/useBoard";
import { Player } from "../../models/player";

interface GameProps {
  players: Player[];
  board: IBoard;
  moveplayer: (id: string, amount: number) => boolean;
}

const Game: React.VFC<GameProps> = ({ players, board, moveplayer }) => {
  const description =
    "Never have I ever used a fake ID to get into a party or buy drinks";
  const outcome = "Take 2 sips if you have";

  const [isChallenge, setIsChallenge] = useState<boolean>(false);
  const [isDice, setIsDice] = useState<boolean>(false);

  const processDiceResult: (diceFace: string) => void = (diceFace) => {
    console.log(diceFace);
    setIsDice(false);
  };

  const doSomething: () => void = () => {
    moveplayer(players[0].playerId, 1);
  };

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
              onClose={() => setIsChallenge(false)}
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
