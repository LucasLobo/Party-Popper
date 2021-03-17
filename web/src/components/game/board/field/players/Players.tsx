import React from "react";
import { IPlayer } from "../../../../../hooks/useBoard";
import { Player } from "../../../../../models/player";
import "./Players.css";

interface PlayersProps {
  players: Player[];
}

const maxPlayers = 5;

const getIconPath: (name: string) => string = (name) => {
  return `/svg/avatars/${name}.svg`;
};

const People: React.VFC<PlayersProps> = ({ players }) => {
  if (players.length === 0) {
    // nothing should be visible
    return <span />;
  }
  if (players.length <= maxPlayers) {
    // all icons should be visible
    return (
      <div className="field-people">
        {players.map((player) => {
          return (
            <img
              key={player.nickName}
              alt={player.avatar}
              src={getIconPath(player.avatar)}
            />
          );
        })}
      </div>
    );
  }

  // shortened version (a few icons + X people) should be visible
  return (
    <div className="field-people">
      {players.slice(0, maxPlayers).map((player) => {
        return (
          <img
            key={player.nickName}
            alt={player.avatar}
            src={getIconPath(player.avatar)}
          />
        );
      })}
      <span>+{players.length - maxPlayers}</span>
    </div>
  );
};

export default People;
