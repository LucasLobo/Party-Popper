import React from "react";
import "./Lobby.css";

import Input from "../input/Input";
import Button from "../button/Button";
import Person from "./person/Person";

import Game from "../../assets/game.json";

const Lobby: React.VFC = () => {
  const gameCode = "3d90712";

  return (
    <div className="lobby-container">
      <Input
        className="landing-input"
        placeholder="game code"
        color="blue"
        value={gameCode}
        disabled
      />

      <div className="lobby-people-container">
        {Game.players.map((person) => {
          return (
            <Person key={person.id} name={person.name} avatar={person.avatar} />
          );
        })}
      </div>

      <Button
        color="green"
        label="copy invite code"
        onClick={() => navigator.clipboard.writeText(gameCode)}
      />
    </div>
  );
};

export default Lobby;
