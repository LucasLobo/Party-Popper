import React, { useEffect, useState } from "react";
import "./Game.css";

import Header from "../header/Header";
import Board from "./board/Board";
import Challenge from "./challenge/Challenge";
import Dice from "./dice/Dice";
import { IBoard } from "../../hooks/useBoard";
import { Player } from "../../models/player";
import { socket } from "../../utils/socket";

import challenges from "../../assets/challenges.json";

function getRandomInt(min: number, max: number) {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
}

interface GameProps {
  players: Player[];
  board: IBoard;
  currentPlayerId: string;
  code: string;
}

const Game: React.VFC<GameProps> = ({
  players,
  board,
  currentPlayerId,
  code,
}) => {
  const [description, setDescription] = useState<string>("");
  const [outcome, setOutcome] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [isChallenge, setIsChallenge] = useState<boolean>(false);
  const [isDice, setIsDice] = useState<boolean>(false);

  const processDiceResult: (amount: number) => void = (amount) => {
    socket.emit("updateposition", {
      playerId: currentPlayerId,
      amount,
      code,
    });
    setIsDice(false);
  };

  const nextPlayer: () => void = () => {
    socket.emit("chooseplayer", { code });
    setIsChallenge(false);
  };

  const currentPlayerName = () => {
    const currentPlayer = players.find(
      (player) => player.playerId === currentPlayerId
    );
    if (!currentPlayer) return "undefined";
    return currentPlayer.nickName;
  };

  useEffect(() => {
    socket.on("chooseplayer", (player: any) => {
      if (player.playerId === currentPlayerId) {
        setIsDice(true);
      }
    });

    socket.on("positionupdated", ({ playerId, position }: any) => {
      if (currentPlayerId === playerId) {
        const { category }: { category: string } = board.fields[position];
        setCategory(category);
        Object.entries(challenges).forEach(([key, categoryChallenges]) => {
          if (key === category) {
            const challengeIndex = getRandomInt(
              0,
              categoryChallenges.length - 1
            );
            setDescription(categoryChallenges[challengeIndex].description);
            setOutcome(categoryChallenges[challengeIndex].outcome);
          }
        });

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
        <Header color="default" title={currentPlayerName()} />
        <Board fields={board.fields} />
      </div>

      {(isChallenge || isDice) && (
        <div className="overlay-container">
          {isChallenge && (
            <Challenge
              description={description}
              outcome={outcome}
              color="green"
              onClose={nextPlayer}
              title={category}
            />
          )}
          {isDice && <Dice resultCallback={processDiceResult} />}
        </div>
      )}
    </div>
  );
};

export default Game;
