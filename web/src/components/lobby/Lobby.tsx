import React, { useState } from "react";
import "./Lobby.css";

import Input from "../input/Input";
import Button from "../button/Button";
import Person from "./person/Person";

import { Player } from "../../models/player";

interface LobbyProps {
  code: string;
  start: () => void;
  players: Player[];
  isOwner: boolean;
}
const Lobby: React.VFC<LobbyProps> = ({ code, start, players, isOwner }) => {
  const [isReady, setReady] = useState(false);

  return (
    <div className="lobby-container">
      <Input placeholder="game code" color="blue" value={code} disabled />

      <div className="lobby-people-container">
        {players.map((person) => {
          return (
            <Person
              key={person.playerId}
              name={person.nickName}
              avatar={person.avatar}
              isReady={isReady}
            />
          );
        })}
      </div>
      <Button
        color={isReady ? "red" : "indigo"}
        label={isReady ? "Not Ready !" : "Ready !"}
        onClick={() => {
          if (isReady) {
            setReady(false);
          } else {
            setReady(true);
          }
          console.log(isReady);
        }}
      />
      <Button
        label="copy invite code"
        onClick={() => {
          console.log(players);
          navigator.clipboard.writeText(code);
        }}
      />
      {isOwner ? (
        <Button color="green" label="start game" onClick={start} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Lobby;
