import React from "react";
import "./Game.css";

import useBoard from "../../hooks/useBoard";

import Header from "../header/Header";
import Board from "./board/Board";

const Game: React.VFC = () => {
  const [board, movePlayer] = useBoard();

  const doSomething: () => void = () => {
    movePlayer(6732, 1);
  };

  return (
    <div className="game">
      <Header
        title={board.players[1].name}
        secondary={`${board.players[1].position}`}
      />
      <Board fields={board.fields} />

      <button type="button" onClick={doSomething} className="temp-button">
        Advance Rita
      </button>
    </div>
  );
};

export default Game;
