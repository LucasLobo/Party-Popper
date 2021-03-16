import React from "react";
import "./Lobby.css";

import Input from "../input/Input";
import Button from "../button/Button";
import Person from "./person/Person";

import Game from "../../assets/game.json";

interface LobbyProps {
  code: string;
  start: () => void;
}
const Lobby: React.VFC<LobbyProps> = ({ code, start }) => {
  return (
    <div className="lobby-container">
      <Input placeholder="game code" color="blue" value={code} disabled />

      <div className="lobby-people-container">
        {Game.players.map((person) => {
          return (
            <Person key={person.id} name={person.name} avatar={person.avatar} />
          );
        })}
      </div>
      <Button
        label="copy invite code"
        onClick={() => navigator.clipboard.writeText(code)}
      />
      <Button color="green" label="start game" onClick={start} />
    </div>
  );
};

export default Lobby;
