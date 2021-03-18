import React, { useEffect, useState } from "react";
import "./Lobby.css";

import Input from "../input/Input";
import Button from "../button/Button";
import Person from "./person/Person";

import { Player } from "../../models/player";
import { socket } from "../../utils/socket";
import { SocketType } from "../../utils/constants";

interface LobbyProps {
  code: string;
  start: () => void;
  players: Player[];
  isOwner: boolean;
  playerId: string;
}
const Lobby: React.VFC<LobbyProps> = ({
  code,
  start,
  players,
  isOwner,
  playerId,
}) => {
  const [isReady, setReady] = useState(false);
  const [isAllReady, setAllReady] = useState(false);
  const isAllReadycheck = () => {
    for (let p = 0; p < players.length; p += 1) {
      if (!players[p].ready) return false;
    }
    return true;
  };

  useEffect(() => {
    setAllReady(isAllReadycheck());
  }, [players, isReady]);

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
              isReady={person.ready}
            />
          );
        })}
      </div>
      <Button
        color={isReady ? "red" : "indigo"}
        label={isReady ? "Not Ready !" : "Ready !"}
        onClick={() => {
          if (isReady) {
            socket.emit(SocketType.READY, { playerId, code });
            setReady(false);
          } else {
            socket.emit(SocketType.READY, { playerId, code });
            setReady(true);
          }
        }}
      />
      <Button
        label="copy invite code"
        onClick={() => {
          navigator.clipboard.writeText(code);
        }}
      />
      {isOwner && (
        <Button
          color="green"
          label="start game"
          onClick={start}
          disabled={!isAllReady}
        />
      )}
    </div>
  );
};

export default Lobby;
