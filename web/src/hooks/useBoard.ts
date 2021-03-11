import React, { useState } from "react";

import gameData from "../assets/game.json";

export interface IPlayer {
  id: number;
  name: string;
  avatar: string;
  position: number;
}

export interface IField {
  position: number;
  category: string;
  color: string;
  players?: IPlayer[];
}

export interface IBoard {
  code: number;
  fields: IField[];
  players: IPlayer[];
  started: boolean;
}

function useBoard(): [IBoard, (id: number, amount: number) => boolean] {
  const [board, setBoard] = useState<IBoard>({ ...gameData, started: false });

  const computePlayerFields = () => {
    const { fields } = board;

    for (let i = 0; i < board.fields.length; i += 1) {
      board.fields[i].players = [];
    }

    board.players.forEach((player: IPlayer) => {
      if (fields[player.position].players === undefined) {
        fields[player.position].players = [];
      }
      fields[player.position].players?.push(player);
    });
    setBoard({ ...board, fields: board.fields });
  };

  if (!board.started) {
    board.started = true;
    computePlayerFields();
  }

  const movePlayer = (id: number, amount: number) => {
    const player = board.players.find((element) => element.id === id);
    if (player === undefined || player.position + amount >= board.fields.length)
      return false;

    const position = player.position + amount;
    player.position = position;

    computePlayerFields();
    return true;
  };

  return [board, movePlayer];
}

export default useBoard;
