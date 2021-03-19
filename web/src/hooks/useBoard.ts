import { useEffect, useState } from "react";
import gameData from "../assets/game.json";
import { Player } from "../models/player";
import { usePlayers } from "./usePlayers";

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
  players?: Player[];
}

export interface IBoard {
  fields: IField[];
}

function useBoard(): [
  IBoard,
  Player[],
  (id: string, amount: number) => boolean,
  (fields: IField[]) => void
] {
  const [board, setBoard] = useState<IBoard>({ fields: [] });

  const players: Player[] = usePlayers();

  const computePlayerFields = () => {
    const { fields } = board;
    if (fields.length === 0) return;

    for (let i = 0; i < board.fields.length; i += 1) {
      board.fields[i].players = [];
    }

    players.forEach((player: Player) => {
      if (fields[player.position].players === undefined) {
        fields[player.position].players = [];
      }
      fields[player.position].players?.push(player);
    });
    setBoard({ ...board, fields: board.fields });
  };

  const makeBoard = (fields: IField[]) => {
    setBoard({
      fields,
    });
    computePlayerFields();
  };

  const movePlayer = (id: string, amount: number) => {
    const player = players.find((element) => element.playerId === id);
    if (player === undefined || player.position + amount >= board.fields.length)
      return false;

    const position = player.position + amount;
    player.position = position;

    computePlayerFields();
    return true;
  };

  useEffect(() => {
    computePlayerFields();
  }, [players]);

  return [board, players, movePlayer, makeBoard];
}

export default useBoard;
